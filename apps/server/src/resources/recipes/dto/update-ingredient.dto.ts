import * as Joi from "joi";

import { BaseUnits } from "~/resources/recipes/consts";

import { CreateRecipeIngredientDto } from "./create-ingredient.dto";

export class UpdateRecipeIngredientDto extends CreateRecipeIngredientDto {
  id: string;
}

export const UpdateRecipeIngredientSchema = Joi.object({
  id: Joi.string()
    .guid({
      version: ["uuidv4"],
    })
    .required(),
  amount: Joi.number().positive(),
  units: Joi.string().valid(...Object.values(BaseUnits)),
});
