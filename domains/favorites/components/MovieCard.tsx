import Link from "next/link";
import Image from "next/image";
import { FavoriteToggle } from "@/domains/favorites/components/FavoriteToggle";
import { MovieDetails } from "@/domains/movies/types/movie";

interface MovieCardProps {
  movie: MovieDetails;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <li className="border rounded p-4">
      <Link href={`/movies/${movie.id}`} className="text-xl font-semibold hover:underline">
        {movie.title}
      </Link>
      <p className="text-sm text-gray-600">{movie.release_date}</p>
      {movie.poster_path && (
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={500}
          height={750}
          className="w-full h-auto"
        />
      )}
      <FavoriteToggle movieId={movie.id} />
    </li>
  );
}
