import { PartialType } from "@nestjs/mapped-types";
import * as Joi from "joi";

import { CreateRecipeDto } from "./create-recipe.dto";
import {
  UpdateRecipeIngredientDto,
  UpdateRecipeIngredientSchema,
} from "./update-ingredient.dto";

export class UpdateRecipeDto extends PartialType(CreateRecipeDto) {
  public ingredients?: UpdateRecipeIngredientDto[];
  public duration?: number;
  public complexity?: number;
}

export const UpdateRecipeSchema = Joi.object({
  ingredients: Joi.array().items(UpdateRecipeIngredientSchema),
  duration: Joi.number().integer().positive(),
  complexity: Joi.number().integer().min(1).max(5),
});
