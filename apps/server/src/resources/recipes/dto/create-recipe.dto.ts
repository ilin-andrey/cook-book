import * as Joi from "joi";

export class CreateRecipeDto {
  public duration: number;
  public complexity: number;
  public description: string;
  public dishId: number;
  public calories: number;
  public weight: number;
}

export const CreateRecipeSchema = Joi.object({
  dishId: Joi.string()
    .guid({
      version: ["uuidv4"],
    })
    .required(),
  duration: Joi.number().integer().positive().required(),
  calories: Joi.number().integer().positive(),
  weight: Joi.number().integer().positive(),
  complexity: Joi.number().integer().min(1).max(5).required(),
  description: Joi.string().empty(""),
});
