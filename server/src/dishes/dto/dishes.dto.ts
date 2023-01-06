import * as Joi from "joi";

export class CreateDishDto {
  public id: string;
  public title: string;
  public description: string;
}

export class UpdateDishDto extends CreateDishDto {}

export const CreateDishSchema = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
});
