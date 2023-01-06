import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";

import { Dish } from "./interfaces/dishes.interface";
import { CreateDishDto, UpdateDishDto } from "./dto/dishes.dto";

@Injectable()
export class DishesService {
  private readonly dishes: Dish[] = [];

  create(dish: CreateDishDto) {
    this.dishes.push({
      id: uuidv4(),
      title: dish.title,
      description: dish.description,
    });
  }

  findAll(): Dish[] {
    return this.dishes;
  }

  findOne(id: string): Dish | undefined {
    return this.dishes.find((i) => i.id === id);
  }

  update(id: string, toUpdate: UpdateDishDto): void {
    const idx = this.dishes.findIndex((i) => i.id === id);

    if (idx) {
      this.dishes[idx] = { ...this.dishes[idx], ...toUpdate };
    }
  }
}
