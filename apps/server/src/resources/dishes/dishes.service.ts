import { Injectable } from "@nestjs/common";
import { Dish, Prisma } from "@prisma/client";

import { PrismaService } from "~/prisma.service";

@Injectable()
export class DishesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.DishCreateInput): Promise<Dish> {
    return this.prisma.dish.create({
      data,
    });
  }

  async findAll(): Promise<Dish[]> {
    return this.prisma.dish.findMany();
  }

  async findOne(id: number): Promise<Dish | null> {
    return this.prisma.dish.findFirst({ where: { id } });
  }

  async update(params: {
    where: Prisma.DishWhereUniqueInput;
    data: Prisma.DishUpdateInput;
  }): Promise<Dish> {
    const { data, where } = params;
    return this.prisma.dish.update({
      data: { ...data, updatedAt: new Date() },
      where,
    });
  }

  async remove(where: Prisma.DishWhereUniqueInput): Promise<Dish> {
    return this.prisma.dish.delete({
      where,
    });
  }
}
