import { PartialType } from "@nestjs/mapped-types";
import * as Joi from "joi";

import { CreateDto } from "./create.dto";

export class UpdateDto extends PartialType(CreateDto) {}

export const UpdateSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  imageUrl: Joi.string().empty(""),
});
