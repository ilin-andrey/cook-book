import useSWRImmutable from "swr/immutable";

import { fetcher } from "~/core/api/fetcher";
import { ROUTES } from "~/core/routes";

export const URL = `${process.env.NEXT_PUBLIC_API_URL}${ROUTES.DISHES}`;

type Dish = {
  id: string;
  title: string;
  description: string;
  duration: number;
  complexity: number;
  imageUrl: string;
};

type Response = {
  success: boolean;
  data: Array<Dish>;
};

export type CreateResponse = {
  success: boolean;
  data: Dish;
};

export function useDishes() {
  return useSWRImmutable<Response>(URL, fetcher);
}
