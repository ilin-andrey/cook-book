import { Dish } from "~/core/hooks/use-dishes";

export function ItemView({
  item,
  onUpdate,
}: {
  item: Dish;
  onUpdate: () => void;
}) {
  return (
    <li className="flex justify-between gap-x-6 py-5">
      <div className="flex gap-x-4">
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {item.title}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            {item.description}
          </p>
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-col sm:items-end">
        <a onClick={onUpdate}>Details &gt;</a>
      </div>
    </li>
  );
}
