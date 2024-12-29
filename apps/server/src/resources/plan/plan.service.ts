import { Injectable } from "@nestjs/common";
import { Dish, MealType, Recipe } from "@prisma/client";

import { PrismaService } from "~/prisma.service";

type RecipeWithDish = (Recipe & { factor?: number } & { Dish: Dish }) | null;

@Injectable()
export class PlanService {
  constructor(private prisma: PrismaService) {}

  private async getRandomRecipeByType(
    mealType: MealType,
  ): Promise<RecipeWithDish> {
    const data: Dish[] = await this.prisma.$queryRawUnsafe(
      `SELECT * FROM dish WHERE '${mealType}' = ANY(dish.meal_types) ORDER BY RANDOM() LIMIT 1;`,
    );

    if (data.length === 0) {
      return null;
    }

    return await this.prisma.recipe.findFirst({
      where: {
        dishId: data[0]?.id,
      },
      include: {
        Dish: true,
      },
    });
  }

  async generateRandomDishesByParams({
    days,
    people,
    caloriesPerDay: caloriesPerDayForAll,
    mealTypes,
  }: {
    days: number;
    people: number;
    caloriesPerDay: number;
    mealTypes: MealType[];
  }): Promise<unknown> {
    const meals: RecipeWithDish[] = [];
    const restCaloriesPerDay = Array.from(
      { length: days },
      () => caloriesPerDayForAll,
    );
    const restPortionsPerDay = mealTypes.reduce<Record<string, number[]>>(
      (acc, val) => {
        acc[val] = Array.from({ length: days }, () => people);
        return acc;
      },
      {},
    );
    const dishesPerDay: Array<Record<string, unknown>[]> = Array.from(
      { length: days },
      () => [],
    );

    for (const meal of mealTypes) {
      for (let i = 0; i < days; i++) {
        if (restCaloriesPerDay[i] <= 0 || restPortionsPerDay[meal][i] <= 0) {
          continue;
        }

        const recipe = await this.getRandomRecipeByType(meal);

        if (!recipe) {
          continue;
        }

        const caloriesPerServing = recipe.calories / recipe.portions;
        const caloriesPerMeal = caloriesPerServing * people;

        // breakfast is always added as is
        if (meal === MealType.BREAKFAST) {
          // reduction or multiplying factor
          recipe.factor = people / recipe.portions;

          restCaloriesPerDay[i] -= caloriesPerMeal;
          restPortionsPerDay[meal][i] = 0;

          meals.push(recipe);
          dishesPerDay[i].push({
            title: recipe.Dish.title,
            caloriesPerServing,
          });

          continue;
        }

        const restDays = days - i;
        const requiredPortions =
          people * restDays - (people - restPortionsPerDay[meal][i]);

        // reduction factor if we have enough portions for all people for the rest of the days
        if (requiredPortions <= recipe.portions) {
          recipe.factor = requiredPortions / recipe.portions;

          for (let j = i; j < days; j++) {
            restCaloriesPerDay[j] -=
              caloriesPerServing * restPortionsPerDay[meal][j];
            restPortionsPerDay[meal][j] = 0;
            dishesPerDay[j].push({
              title: recipe.Dish.title,
              caloriesPerServing,
            });
          }
        } else {
          // more exception than rule but still, multiply in this case
          if (restPortionsPerDay[meal][i] > recipe.portions) {
            recipe.factor = restPortionsPerDay[meal][i] / recipe.portions;

            restCaloriesPerDay[i] -=
              caloriesPerServing * restPortionsPerDay[meal][i];
            restPortionsPerDay[meal][i] = 0;

            meals.push(recipe);
            dishesPerDay[i].push({
              title: recipe.Dish.title,
              caloriesPerServing,
            });

            continue;
          }

          recipe.factor = 1;

          let j = i;
          let portionsCounter = recipe.portions;
          while (j < days && portionsCounter > 0) {
            restCaloriesPerDay[j] -= caloriesPerServing;
            restPortionsPerDay[meal][j] -= 1;

            dishesPerDay[j].push({
              title: recipe.Dish.title,
              caloriesPerServing,
            });

            portionsCounter -= 1;
            if (restPortionsPerDay[meal][j] === 0) {
              j++;
            }
          }
        }

        meals.push(recipe);
      }
    }

    return {
      meals,
      restCaloriesPerDay,
      restPortionsPerDay,
      dishesPerDay,
    };
  }
}
