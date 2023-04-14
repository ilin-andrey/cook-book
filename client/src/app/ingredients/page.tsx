"use client";

import { Button } from "~/components/atoms/Button";
import { postRequest } from "~/core/api/fetcher";
import {
  CreateResponse,
  URL,
  useIngredients,
} from "~/core/hooks/useIngredients";

const testIng = {
  title: "test",
  description: "",
  imageUrl: "",
};

export default function Ingredients() {
  const { data, isLoading, error, mutate } = useIngredients();

  const handleClick = async () => {
    const response = await postRequest<CreateResponse>(URL, testIng);
    await mutate({ ...data, data: [...data.data, response.data] });
  };

  if (error) return <div>Failed to load: {error}</div>;
  if (isLoading)
    return <div className="py-12 px-6 sm:py-16 lg:px-8">Loading...</div>;

  return (
    <div className="py-12 px-6 sm:py-16 lg:px-8">
      <Button onClick={handleClick}>Add</Button>

      <pre className="my-6">{data && JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
