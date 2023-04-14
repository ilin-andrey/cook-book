import * as Joi from "joi";

export class CreateDto {
  public title: string;
  public description: string;
  public duration: number;
  public complexity: number;
  public imageUrl: string;
}

export const CreateSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().empty(""),
  duration: Joi.number().integer().positive().required(),
  complexity: Joi.number().integer().min(1).max(5).required(),
  imageUrl: Joi.string().empty(""),
});
