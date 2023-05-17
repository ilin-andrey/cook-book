"use client";

import { Form, ItemsList } from "~/components/Ingredient";
import { postRequest } from "~/core/api/fetcher";
import { CreateDto } from "~/core/dto/ingredient";
import {
  CreateResponse,
  Ingredient,
  URL,
  useIngredients,
} from "~/core/hooks/use-ingredients";

function IngrdientView({
  data,
  onSubmit,
}: {
  data: Array<Ingredient>;
  onSubmit: (data: CreateDto) => Promise<void>;
}) {
  return (
    <div className="py-12 px-6 sm:py-16 lg:px-8">
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Ingredients
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        List of all available ingredients from the library.
      </p>
      <ItemsList items={data} />

      <div className="mt-10">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Add ingredient
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Add a new ingredient to the library.
        </p>

        <div className="w-auto mt-8" style={{ maxWidth: "50rem" }}>
          <Form onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
}

export default function Ingredients() {
  const { data, isLoading, error, mutate } = useIngredients();

  const items = data ? data.data : [];

  const handleSubmit = async (toCreate: CreateDto) => {
    const response = await postRequest<CreateResponse>(URL, toCreate);
    await mutate({ ...data, data: [...data.data, response.data] });
  };

  if (error) return <div>Failed to load: {error}</div>;
  if (isLoading)
    return <div className="py-12 px-6 sm:py-16 lg:px-8">Loading...</div>;

  return <IngrdientView data={items} onSubmit={handleSubmit} />;
}
