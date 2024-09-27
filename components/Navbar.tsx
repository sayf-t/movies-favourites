import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">
          Movie App
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="text-white hover:text-gray-300">
              Popular Movies
            </Link>
          </li>
          <li>
            <Link href="/favorites" className="text-white hover:text-gray-300">
              Favorites
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
