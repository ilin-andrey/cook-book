import { PartialType } from "@nestjs/mapped-types";
import * as Joi from "joi";

import { CreateIngredientDto } from "./create.dto";

export class UpdateIngredientDto extends PartialType(CreateIngredientDto) {}

export const UpdateIngredientSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string().empty(""),
  imageUrl: Joi.string().empty(""),
});
