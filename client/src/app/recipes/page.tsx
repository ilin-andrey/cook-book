"use client";

import * as R from "rambda";

import { Button } from "~/components/atoms/Button";
import { Select } from "~/components/atoms/Select";
import { postRequest } from "~/core/api/fetcher";
import { useDishes } from "~/core/hooks/use-dishes";
import { useIngredients } from "~/core/hooks/use-ingredients";
import { CreateResponse, URL, useRecipes } from "~/core/hooks/use-recipes";

export default function Recipes() {
  const { data: dishes, isLoading: dichesLoading } = useDishes();
  const { data: ingredients, isLoading: ingredientsLoading } = useIngredients();
  const { data, isLoading, error, mutate } = useRecipes();

  const handleClick = async () => {
    const newRecipe = {
      dishId: dishes?.data?.[0].id,
      ingredients: [
        {
          ingredientId: ingredients?.data?.[0].id,
          amount: 123,
          units: "mg",
        },
      ],
    };

    const response = await postRequest<CreateResponse>(URL, newRecipe);
    await mutate({ ...data, data: [...data.data, response.data] });
  };

  if (error) return <div>Failed to load: {error}</div>;
  if (R.all((x) => !!x, [isLoading, dichesLoading, ingredientsLoading]))
    return <div className="py-12 px-6 sm:py-16 lg:px-8">Loading...</div>;

  return (
    <div className="py-12 px-6 sm:py-16 lg:px-8">
      <div className="flex flex-col gap-4 w-fit mb-8">
        <div>
          <label>Dish:</label>
          <Select>
            {dishes?.data.map((i) => (
              <option key={i.id}>{i.id}</option>
            ))}
          </Select>
        </div>

        <div>
          <label>Ingredient:</label>
          <Select>
            {ingredients?.data.map((i) => (
              <option key={i.id}>{i.id}</option>
            ))}
          </Select>
        </div>
      </div>

      <Button
        onClick={handleClick}
        disabled={!dishes?.data.length || !ingredients?.data.length}
      >
        Add
      </Button>

      <pre className="my-6">{data && JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
