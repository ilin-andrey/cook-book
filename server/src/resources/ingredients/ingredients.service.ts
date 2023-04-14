import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";

import { CreateDto } from "./dto/create.dto";
import { UpdateDto } from "./dto/update.dto";
import { Ingredient } from "./interfaces/ingredients.interface";

@Injectable()
export class IngredientsService {
  private readonly data: Ingredient[] = [];

  create(toCreate: CreateDto): Ingredient {
    const newObj = {
      id: uuidv4(),
      title: toCreate.title,
      description: toCreate.description,
      imageUrl: toCreate.imageUrl,
    };
    this.data.push(newObj);

    return newObj;
  }

  findAll(): Ingredient[] {
    return this.data;
  }

  findOne(id: string): Ingredient | undefined {
    return this.data.find((i) => i.id === id);
  }

  update(id: string, toUpdate: UpdateDto): Ingredient | undefined {
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
