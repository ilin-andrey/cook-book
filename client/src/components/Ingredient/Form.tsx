import { clsx } from "clsx";
import { BaseSyntheticEvent, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

import { Button } from "~/components/atoms/Button";
import { CreateDto } from "~/core/dto/ingredient";

const intialValues: CreateDto = {
  title: "",
  description: "",
};

export function Form({
  onSubmit,
}: {
  onSubmit: (data: CreateDto) => Promise<void>;
}) {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleFormSbmit = async (
    data: FieldValues,
    e: BaseSyntheticEvent<HTMLFormElement>
  ) => {
    setLoading(true);

    await onSubmit({
      title: data.title,
      description: data.description,
    });

    setLoading(false);

    e.target.reset();
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSbmit)}>
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Title
        </label>
        <div className="mt-2">
          <input
            {...register("title", {
              required: true,
            })}
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            className={clsx(
              "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
              !!errors.title &&
                "text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500"
            )}
            defaultValue={intialValues.title}
            aria-invalid={!!errors.title}
          />
        </div>

        {errors.title && errors.title.type === "required" && (
          <p
            role="alert"
            className="mt-2 text-sm text-red-600"
            id="title-error"
          >
            Title value is required.
          </p>
        )}
        {errors.title && errors.title.type !== "required" && (
          <p
            role="alert"
            className="mt-2 text-sm text-red-600"
            id="title-error"
          >
            <>{errors.title?.message}</>
          </p>
        )}
      </div>

      <div className="mt-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Description
        </label>
        <div className="mt-2">
          <textarea
            {...register("description")}
            id="description"
            name="description"
            rows={3}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            defaultValue={intialValues.description}
            aria-invalid={!!errors.description}
            aria-describedby="desc-description"
          />
        </div>
        <p className="mt-2 text-sm text-gray-500" id="desc-description">
          Write a few sentences about the ingredient.
        </p>
        {errors.description && (
          <p
            role="alert"
            className="mt-2 text-sm text-red-600"
            id="description-error"
          >
            <>{errors.description?.message}</>
          </p>
        )}
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-4">
        <Button
          type="submit"
          disabled={loading}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-75 disabled:pointer-events-none"
        >
          Add
        </Button>
      </div>
    </form>
  );
}
