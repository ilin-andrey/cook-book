export type Props = { items: Array<{ name: string; href: string }> };

export function Header({ items }: Props) {
  return (
    <header className="bg-indigo-600 px-8 py-3 lg:px-12">
      <nav className="flex gap-8 items-center">
        {items.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="text-base font-medium text-white hover:text-indigo-50"
          >
            {item.name}
          </a>
        ))}
      </nav>
    </header>
  );
}
