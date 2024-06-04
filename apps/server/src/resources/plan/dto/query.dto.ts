import * as Joi from "joi";

export class QueryDto {
  public days: number;
  public people: number;
  public caloriesPerDay: number;
}

export const QuerySchema = Joi.object({
  days: Joi.number(),
  people: Joi.number(),
  caloriesPerDay: Joi.number(),
});
