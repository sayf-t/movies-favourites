const API_KEY = process.env.TMDB_API_KEY || "";

export async function fetchPopularMovies() {
  if (!API_KEY) {
    throw new Error("API key is not set");
  }
  const response = await fetch("https://api.themoviedb.org/3/movie/popular", {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      accept: "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
