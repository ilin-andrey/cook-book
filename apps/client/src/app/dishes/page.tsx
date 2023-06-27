"use client";

import { Form, ItemsList } from "~/components/Dish";
import { postRequest } from "~/core/api/fetcher";
import { CreateDto } from "~/core/dto/dish";
import { CreateResponse, Dish, URL, useDishes } from "~/core/hooks/use-dishes";

function DishView({
  data,
  onSubmit,
}: {
  data: Array<Dish>;
  onSubmit: (data: CreateDto) => Promise<void>;
}) {
  return (
    <div className="py-12 px-6 sm:py-16 lg:px-8">
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Dishes
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        List of all available dishes from the library.
      </p>
      <ItemsList items={data} />

      <div className="mt-10">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Add dish
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Add a new dish to the library.
        </p>

        <div className="w-auto mt-8" style={{ maxWidth: "50rem" }}>
          <Form onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
}

export default function Dishes() {
  const { data, isLoading, error, mutate } = useDishes();

  const items = data ? data.data : [];

  const handleSubmit = async (toCreate: CreateDto) => {
    const response = await postRequest<CreateResponse>(URL, toCreate);
    await mutate({ ...data, data: [...data.data, response.data] });
  };

  if (error) return <div>Failed to load: {error}</div>;
  if (isLoading)
    return <div className="py-12 px-6 sm:py-16 lg:px-8">Loading...</div>;

  return <DishView data={items} onSubmit={handleSubmit} />;
}
