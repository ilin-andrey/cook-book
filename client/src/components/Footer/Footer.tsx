const year = new Date().getFullYear();
const url = process.env.NEXT_PUBLIC_PERSONAL_WEBSITE;

export function Footer() {
  return (
    <footer className="bg-white m-0 px-10 py-10">
      <p className="text-sm text-gray-500">
        &copy; {year}, with ♥ from{" "}
        <a href={url} target="_blank" rel="noreferrer">
          Andrey Ilin
        </a>
      </p>
    </footer>
  );
}
