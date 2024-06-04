import {
  Dish,
  Ingredient,
  MealType,
  PrismaClient,
  Recipe,
  Units,
} from "@prisma/client";

const prisma = new PrismaClient();

const dishesByMealType = {
  [MealType.BREAKFAST]: ["scrambled eggs", "english breakfast"],
  [MealType.LUNCH]: [
    "borscht",
    "shchi",
    "goulash soup",
    "pumpkin puree soup",
    "tom yum",
    "zucchini puree soup",
    "chicken soup with cheese",
    "mushroom puree soup",
  ],
  [MealType.DINNER]: ['"Olivier" salad', "Caesar salad", "Greek salad"],
};

const ingredients = [
  "potato",
  "beet",
  "carrot",
  "onion",
  "garlic",
  "cabbage",
  "tomato",
  "bell pepper",
  "mushroom",
  "zucchini",
  "pumpkin",
  "chicken",
  "beef",
  "pork",
  "cheese",
  "cream",
  "butter",
  "olive oil",
  "salt",
  "pepper",
  "sugar",
  "flour",
  "water",
  "milk",
  "sour cream",
  "egg",
  "dill",
  "parsley",
  "cilantro",
  "basil",
  "thyme",
  "oregano",
  "rosemary",
  "mint",
  "cumin",
  "coriander",
  "curry",
  "paprika",
  "cayenne pepper",
  "chili",
  "soy sauce",
  "worcestershire sauce",
  "ketchup",
  "mayonnaise",
  "mustard",
  "vinegar",
  "lemon",
  "lime",
  "orange",
  "apple",
  "banana",
  "strawberry",
  "blueberry",
  "raspberry",
  "blackberry",
  "cherry",
  "peach",
  "apricot",
  "plum",
  "pear",
  "grape",
  "water",
];

function getRandomValueInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

async function clearDatabase() {
  await prisma.ingredientsOnRecipe.deleteMany();
  await prisma.recipe.deleteMany();
  await prisma.dish.deleteMany();
}

async function createIngredients() {
  const ret = [];

  for (const name of ingredients) {
    const result = await prisma.ingredient.create({
      data: {
        title: name,
        description: "Description for " + name,
      },
    });

    ret.push(result);
  }

  return ret;
}

async function createDishes(): Promise<Dish[]> {
  const ret = [];

  for (const [mealType, dishes] of Object.entries(dishesByMealType)) {
    for (const title of dishes) {
      const result = await prisma.dish.create({
        data: {
          title,
          description: "Description for " + title,
          mealTypes: [mealType as MealType],
        },
      });

      ret.push(result);
    }
  }

  return ret;
}

async function createRecipeForDish(dish: Dish): Promise<Recipe> {
  return await prisma.recipe.create({
    data: {
      description: "Recipe for " + dish.title,
      dishId: dish.id,
      duration: 900,
      complexity: getRandomValueInRange(2, 5),
      calories: dish.mealTypes.includes(MealType.BREAKFAST)
        ? getRandomValueInRange(2500, 7500) / 10
        : getRandomValueInRange(2500, 7500),
      portions: getRandomValueInRange(4, 8),
      weight: getRandomValueInRange(3000, 4000),
    },
  });
}

async function addIngredientsToRecipe(
  recipeId: number,
  ingredients: Ingredient[],
) {
  for (const ingredient of ingredients) {
    await prisma.ingredientsOnRecipe.create({
      data: {
        recipeId,
        ingredientId: ingredient.id,
        units: Units.GRAMM,
        size: getRandomValueInRange(50, 200),
      },
    });
  }
}

async function main() {
  await clearDatabase();

  const ings = await createIngredients();
  const dishes = await createDishes();

  for (const dish of dishes) {
    const recipe = await createRecipeForDish(dish);

    const randomIngredients = ings
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 10) + 1);

    await addIngredientsToRecipe(recipe.id, randomIngredients);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
