import * as Joi from "joi";

import {
  CreateRecipeIngredientDto,
  CreateRecipeIngredientSchema,
} from "./create-ingredient.dto";

export class CreateRecipeDto {
  public dishId: string;
  public ingredients: CreateRecipeIngredientDto[];
}

export const CreateRecipeSchema = Joi.object({
  dishId: Joi.string()
    .guid({
      version: ["uuidv4"],
    })
    .required(),
  ingredients: CreateRecipeIngredientSchema,
});
