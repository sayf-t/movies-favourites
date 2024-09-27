import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navbar from "../components/Navbar"; // Add this line

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie Favorites App",
  description: "An app to browse and favorite movies",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar /> {/* Add this line */}
          {children}
        </Providers>
      </body>
    </html>
  );
}
