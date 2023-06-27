import Link from "next/link";

const YEAR = new Date().getFullYear();
const URL = process.env.NEXT_PUBLIC_PERSONAL_WEBSITE;
const AUTHOR = process.env.NEXT_PUBLIC_AUTHOR;

export function Footer() {
  return (
    <footer className="bg-white m-0 px-10 py-10">
      <p className="text-sm text-gray-500">
        &copy; {YEAR}, with ♥ from{" "}
        <Link
          href={URL}
          target="_blank"
          rel="noreferrer"
          className="no-underline hover:underline"
        >
          {AUTHOR}
        </Link>
      </p>
    </footer>
  );
}
