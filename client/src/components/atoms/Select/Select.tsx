import { DetailedHTMLProps, SelectHTMLAttributes } from "react";

export function Select({
  children,
  ...rest
}: DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>) {
  return (
    <select
      {...rest}
      className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
    >
      {children}
    </select>
  );
}
