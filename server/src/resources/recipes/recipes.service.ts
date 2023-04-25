import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";

import { CreateRecipeDto } from "./dto/create-recipe.dto";
import { UpdateRecipeDto } from "./dto/update-recipe.dto";
import { Recipe } from "./interfaces/recipe.interface";

@Injectable()
export class RecipesService {
  private readonly data: Recipe[] = [];

  create(toCreate: CreateRecipeDto): Recipe {
    const newObj = {
      id: uuidv4(),
      dishId: toCreate.dishId,
      ingredients: toCreate.ingredients.map((i) => ({ id: uuidv4(), ...i })),
    };
    this.data.push(newObj);

    return newObj;
  }

  findAll(): Recipe[] {
    return this.data;
  }

  findOne(id: string): Recipe | undefined {
    return this.data.find((i) => i.id === id);
  }

  update(id: string, toUpdate: UpdateRecipeDto): Recipe | undefined {
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