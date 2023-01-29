import * as Joi from "joi";

export class CreateIngredientDto {
  public title: string;
  public description: string;
}

export class UpdateIngredientDto extends CreateIngredientDto {}

export const CreateIngredientSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});
