import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";

import { CreateDishDto } from "./dto/create.dto";
import { UpdateDishDto } from "./dto/update.dto";
import { Dish } from "./interfaces/dishes.interface";

@Injectable()
export class DishesService {
  private readonly data: Dish[] = [];

  create(toCreate: CreateDishDto) {
    this.data.push({
      id: uuidv4(),
      title: toCreate.title,
      description: toCreate.description,
      duration: toCreate.duration,
      complexity: toCreate.complexity,
      imageUrl: toCreate.imageUrl,
    });
  }

  findAll(): Dish[] {
    return this.data;
  }

  findOne(id: string): Dish | undefined {
    return this.data.find((i) => i.id === id);
  }

  update(id: string, toUpdate: UpdateDishDto): void {
    const idx = this.data.findIndex((i) => i.id === id);

    if (idx) {
      this.data[idx] = { ...this.data[idx], ...toUpdate };
    }
  }

  remove(id: string): void {
    const idx = this.data.findIndex((i) => i.id === id);
    this.data.splice(idx, 1);
  }
}
