import * as Joi from "joi";

export class CreateDishDto {
  public title: string;
  public description: string;
}

export class UpdateDishDto extends CreateDishDto {}

export const CreateDishSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});
