"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [activeHref, setActiveHref] = useState(pathname);

  useEffect(() => {
    setActiveHref(pathname);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/favorites", label: "Favorites" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            Movie App
          </Link>
          <div className="space-x-4 relative">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-md transition-all duration-300 ease-in-out ${
                  activeHref === link.href
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveHref(link.href);
                  setTimeout(() => {
                    window.location.href = link.href;
                  }, 300);
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
