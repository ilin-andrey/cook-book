import * as Joi from "joi";

export class RegisterDto {
  public name: string;
  public email: string;
  public password: string;
}

export const RegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});
