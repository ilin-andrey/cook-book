import * as Joi from "joi";

export class LoginDto {
  public email: string;
  public password: string;
}

export const LoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
