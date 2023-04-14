import useSWRImmutable from "swr/immutable";

import { fetcher } from "~/core/api/fetcher";
import { ROUTES } from "~/core/routes";

export const URL = `${process.env.NEXT_PUBLIC_API_URL}${ROUTES.INGREDIENTS}`;

type Ingredient = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
};

type Response = {
  success: boolean;
  data: Array<Ingredient>;
};

export type CreateResponse = {
  success: boolean;
  data: Ingredient;
};

export function useIngredients() {
  return useSWRImmutable<Response>(URL, fetcher);
}
