import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-10 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            Movie App
          </Link>
          <div className="space-x-4">
            <Link href="/" className="hover:text-gray-700">
              Home
            </Link>
            <Link href="/favorites" className="hover:text-gray-700">
              Favorites
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
