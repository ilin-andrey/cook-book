import { Injectable } from "@nestjs/common";
import { Prisma, Recipe } from "@prisma/client";

import { PrismaService } from "~/prisma.service";

import { CreateRecipeDto } from "./dto/create-recipe.dto";

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateRecipeDto): Promise<Recipe> {
    const { dishId, ...rest } = data;
    return this.prisma.recipe.create({
      data: {
        ...rest,
        Dish: {
          connect: { id: dishId },
        },
      },
    });
  }

  async findAll(): Promise<Recipe[]> {
    return this.prisma.recipe.findMany();
  }

  async findOne(id: number): Promise<Recipe | null> {
    return this.prisma.recipe.findFirst({ where: { id } });
  }

  async update(params: {
    where: Prisma.RecipeWhereUniqueInput;
    data: Prisma.RecipeUpdateInput;
  }): Promise<Recipe> {
    const { data, where } = params;
    return this.prisma.recipe.update({
      data: { ...data, updatedAt: new Date() },
      where,
    });
  }

  async remove(where: Prisma.RecipeWhereUniqueInput): Promise<Recipe> {
    return this.prisma.recipe.delete({
      where,
    });
  }
}
