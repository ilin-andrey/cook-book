import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";

import {
  CreateIngredientDto,
  UpdateIngredientDto,
} from "./dtos/ingredients.dto";
import { Ingredient } from "./interfaces/ingredients.interface";

@Injectable()
export class IngredientsService {
  private readonly data: Ingredient[] = [];

  create(toCreate: CreateIngredientDto) {
    this.data.push({
      id: uuidv4(),
      title: toCreate.title,
      description: toCreate.description,
      imageUrl: toCreate.imageUrl,
    });
  }

  findAll(): Ingredient[] {
    return this.data;
  }

  findOne(id: string): Ingredient | undefined {
    return this.data.find((i) => i.id === id);
  }

  update(id: string, toUpdate: UpdateIngredientDto): void {
    const idx = this.data.findIndex((i) => i.id === id);

    if (idx) {
      this.data[idx] = { ...this.data[idx], ...toUpdate };
    }
  }

  delete(id: string): void {
    const idx = this.data.findIndex((i) => i.id === id);
    this.data.splice(idx, 1);
  }
}
