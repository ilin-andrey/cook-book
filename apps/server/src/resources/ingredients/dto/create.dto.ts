import * as Joi from "joi";

export class CreateDto {
  public title: string;
  public description: string;
}

export const CreateSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().empty(""),
});
