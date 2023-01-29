import * as Joi from "joi";

export class CreateDishDto {
  public title: string;
  public description: string;
  public duration: number;
  public complexity: number;
  public imageUrl: string | null;
}

export class UpdateDishDto extends CreateDishDto {}

export const CreateDishSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  duration: Joi.number().integer().positive().required(),
  complexity: Joi.number().integer().min(1).max(5).required(),
  imageUrl: Joi.string(),
});
