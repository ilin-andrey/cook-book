import * as Joi from "joi";

import { BaseUnits } from "../interfaces/ingredient.interface";

export class CreateRecipeIngredientDto {
  public id: string;
  public ingredientId: string;
  public amount: number;
  public units: BaseUnits;
}

export const CreateRecipeIngredientSchema = Joi.object({
  ingredientId: Joi.string()
    .guid({
      version: ["uuidv4"],
    })
    .required(),
  amount: Joi.number().positive().required(),
  units: Joi.string()
    .valid(...Object.values(BaseUnits))
    .required(),
});
