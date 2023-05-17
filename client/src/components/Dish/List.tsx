import { Dish } from "~/core/hooks/use-dishes";

import { ItemView } from "./Item";

export function ItemsList({ items }: { items: Array<Dish> }) {
  if (!items.length) return <div>No records found.</div>;

  return (
    <ul role="list" className="mt-6 divide-y divide-gray-100">
      {items.map((item) => (
        <ItemView key={item.id} item={item} onUpdate={() => undefined} />
      ))}
    </ul>
  );
}
