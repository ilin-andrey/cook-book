import { PartialType } from "@nestjs/mapped-types";
import * as Joi from "joi";

import { BaseUnits } from "../interfaces/ingredient.interface";
import { CreateRecipeIngredientDto } from "./create-ingredient.dto";

export class UpdateRecipeIngredientDto extends PartialType(
  CreateRecipeIngredientDto,
) {}

export const UpdateRecipeIngredientSchema = Joi.object({
  amount: Joi.number().positive(),
  units: Joi.string().valid(...Object.values(BaseUnits)),
});
