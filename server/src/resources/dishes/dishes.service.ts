import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";

import { CreateDto } from "./dto/create.dto";
import { UpdateDto } from "./dto/update.dto";
import { Dish } from "./interfaces/dishes.interface";

@Injectable()
export class DishesService {
  private readonly data: Dish[] = [];

  create(toCreate: CreateDto): Dish {
    const newObj = {
      id: uuidv4(),
      title: toCreate.title,
      description: toCreate.description,
      duration: toCreate.duration,
      complexity: toCreate.complexity,
      imageUrl: toCreate.imageUrl,
    };
    this.data.push(newObj);

    return newObj;
  }

  findAll(): Dish[] {
    return this.data;
  }

  findOne(id: string): Dish | undefined {
    return this.data.find((i) => i.id === id);
  }

  update(id: string, toUpdate: UpdateDto): Dish | undefined {
    const idx = this.data.findIndex((i) => i.id === id);

    if (idx) {
      this.data[idx] = { ...this.data[idx], ...toUpdate };
      return this.data[idx];
    }
  }

  remove(id: string): void {
    const idx = this.data.findIndex((i) => i.id === id);
    this.data.splice(idx, 1);
  }
}
