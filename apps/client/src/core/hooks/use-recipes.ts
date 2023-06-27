import useSWRImmutable from "swr/immutable";

import { fetcher } from "~/core/api/fetcher";
import { ROUTES } from "~/core/routes";

export const URL = `${process.env.NEXT_PUBLIC_API_URL}${ROUTES.RECIPES}`;

type RecipeIngredient = {
  id: string;
  ingredientId: string;
  amount: number;
  units: string;
};

type Recipe = {
  id: string;
  dishId: string;
  ingredients: Array<RecipeIngredient>;
};

type Response = {
  success: boolean;
  data: Array<Recipe>;
};

export type CreateResponse = {
  success: boolean;
  data: Recipe;
};

export function useRecipes() {
  return useSWRImmutable<Response>(URL, fetcher);
}
