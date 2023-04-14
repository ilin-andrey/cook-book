import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export function Button({
  children,
  onClick,
  ...rest
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button
      type="button"
      className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
