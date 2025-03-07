import { useSearch } from "../../hooks/useSearch";
import Fetcher from "../../api/omdb";
import { useEffect, useState } from "preact/hooks";
import { Star, Film, Globe, Calendar, Clock, Award } from "lucide-react";

export type Rating = {
  Source: string;
  Value: string;
};

export type Movie = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
};

export default function Title() {
  const { searchQuery } = useSearch();
  const [movie, setMovie] = useState<Movie>();
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchMovie() {
    try {
      if (!searchQuery) return;
      setLoading(true);
      const response = await Fetcher.searchByTitle(searchQuery);
      if (response.Response === "False") return;
      setMovie(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMovie();
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center">
        <img
          src="https://i.gifer.com/ZZ5H.gif"
          alt="Loading..."
          className="w-16 h-16"
        />
      </div>
    );

  if (movie)
    return (
      <div className="w-full flex flex-col md:flex-row items-center md:items-start justify-center gap-10 p-6">
        <div className="md:w-[500px] h-[750px] shadow-lg rounded-lg overflow-hidden">
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
            alt={movie.Title}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="md:w-[55%] flex flex-col md:flex-row gap-5">
          <div className="flex flex-col gap-y-6 bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-lg">
            <div>
              <h1 className="text-4xl font-bold flex items-center gap-2">
                <Film className="w-6 h-6 text-yellow-500" /> {movie.Title}
              </h1>
              <p className="text-gray-400 text-sm">
                {movie.Year} • {movie.Type}
              </p>
            </div>

            <div className="space-y-2 text-gray-300">
              <p>
                <strong>Director:</strong> {movie.Director}
              </p>
              <p>
                <strong>Writer:</strong> {movie.Writer}
              </p>
              <p>
                <strong>Actors:</strong> {movie.Actors}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <p className="flex items-start gap-2 bg-yellow-800 text-white p-3 rounded-lg border border-gray-700">
                <div className={`flex items-center gap-1`}>
                <Globe className="w-4 h-4" />
                <span className="font-medium">Genre:</span>
                </div>
                {movie.Genre}
              </p>
              <p className="flex items-center gap-2 bg-blue-800 text-white p-3 rounded-lg">
                <Clock className="w-4 h-4" />
                <span className="font-medium">Runtime:</span> {movie.Runtime}
              </p>
              <p className="flex items-center gap-2 bg-teal-800 text-white p-3 rounded-lg">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="font-medium">Rated:</span> {movie.Rated}
              </p>
              <p className="flex items-center gap-2 bg-red-800 text-white p-3 rounded-lg">
                <Calendar className="w-4 h-4" />
                <span className="font-medium">Released:</span> {movie.Released}
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-2xl">Plot</h2>
              <p className="text-gray-400">{movie.Plot}</p>
            </div>
          </div>

          <aside className="bg-gray-200 dark:bg-gray-800 p-6 w-fit rounded-lg shadow-lg space-y-6">
            <div className="flex justify-between items-start gap-10">
              <div>
                <p className="text-gray-300 text-sm">IMDB Rating</p>
                <p className="text-xl font-semibold">{movie.imdbRating} / 10</p>
                <p className="text-sm text-gray-400">{movie.imdbVotes} votes</p>
              </div>
              <div>
                <p className="text-gray-300 text-sm">Metascore</p>
                <p className="text-xl font-semibold">{movie.Metascore}</p>
              </div>
            </div>

            <p>
              <strong>BoxOffice:</strong> <span className="bg-amber-200 text-black p-1">{movie.BoxOffice}</span>
            </p>

            <div className={`space-y-1`}>
              <p className={`text-sm`}>
                <strong>Language:</strong> {movie.Language}
              </p>
              <p className={`text-sm`}>
                <strong>Country:</strong> {movie.Country}
              </p>
            </div>
            <p className="flex items-start gap-2">
             <div className={`flex items-center gap-1`}>
                <Award className="w-4 h-4 text-yellow-500" />{" "}
                <strong>Awards:</strong>
             </div>
             <p className="text-sm">
              {movie.Awards}
             </p>
            </p>

            <div>
              <h3 className="font-semibold">Ratings:</h3>
              <ul className="space-y-3">
                {movie.Ratings.map((rate, index) => (
                  <li key={index} className="flex justify-between border-0 border-b-[1px]">
                    <p className="font-medium text-gray-400 text-sm">{rate.Source}:</p>
                    <p className="text-gray-400 text-sm">{rate.Value}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-1">
              <p>
                <strong>Production:</strong> {movie.Production}
              </p>
              <p>
                <strong>Website:</strong>{" "}
                <a href={movie.Website} className="text-blue-400 underline">
                  {movie.Website}
                </a>
              </p>
              <p>
                <strong>DVD:</strong> {movie.DVD}
              </p>
            </div>
          </aside>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-400">
      <p>No Data Available</p>
    </div>
  );
}