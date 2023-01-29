import { RecipeIngredient } from "./ingredient.interface";

export interface Recipe {
  id: string;
  dishId: string;
  ingredients: RecipeIngredient[];
}
