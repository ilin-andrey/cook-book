import { PartialType } from "@nestjs/mapped-types";
import * as Joi from "joi";
import { CreateRecipeDto } from "./create-recipe.dto";

import { UpdateRecipeIngredientSchema } from "./update-ingredient.dto";

export class UpdateRecipeDto extends PartialType(CreateRecipeDto) {}

export const UpdateRecipeSchema = Joi.object({
  ingredients: UpdateRecipeIngredientSchema,
});
