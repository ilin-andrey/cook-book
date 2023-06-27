import { Injectable } from "@nestjs/common";
import { Ingredient, Prisma } from "@prisma/client";

import { PrismaService } from "~/prisma.service";

@Injectable()
export class IngredientsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.IngredientCreateInput): Promise<Ingredient> {
    return this.prisma.ingredient.create({
      data,
    });
  }

  async findAll(): Promise<Ingredient[]> {
    return this.prisma.ingredient.findMany();
  }

  async findOne(id: number): Promise<Ingredient | null> {
    return this.prisma.ingredient.findFirst({ where: { id } });
  }

  async update(params: {
    where: Prisma.IngredientWhereUniqueInput;
    data: Prisma.IngredientUpdateInput;
  }): Promise<Ingredient> {
    const { data, where } = params;
    return this.prisma.ingredient.update({
      data: { ...data, updatedAt: new Date() },
      where,
    });
  }

  async remove(where: Prisma.IngredientWhereUniqueInput): Promise<Ingredient> {
    return this.prisma.ingredient.delete({
      where,
    });
  }
}
