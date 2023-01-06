import * as Joi from "joi";

export class CreateIngredientDto {
  public id: string;
  public title: string;
  public description: string;
}

export class UpdateIngredientDto extends CreateIngredientDto {}

export const CreateIngredientSchema = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
});
