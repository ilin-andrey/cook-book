import { PartialType } from "@nestjs/mapped-types";
import * as Joi from "joi";

import { CreateDishDto } from "./create.dto";

export class UpdateDishDto extends PartialType(CreateDishDto) {}

export const UpdateDishSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  duration: Joi.number().integer().positive(),
  complexity: Joi.number().integer().min(1).max(5),
  imageUrl: Joi.string().empty(""),
});
