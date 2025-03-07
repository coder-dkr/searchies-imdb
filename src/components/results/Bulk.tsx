import { useEffect, useState } from "preact/hooks";
import Fetcher from "../../api/omdb";
import { useSearch } from "../../hooks/useSearch";
import { useInView } from "react-intersection-observer";

type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export default function Bulk() {
  const { searchQuery , setSearchType, setSearchQuery } = useSearch();
  const [data, setData] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pagenum, setPagenum] = useState<number>(1);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView({ threshold: 0.1 });

  async function FetchData(pagenum: number) {
    if (!hasMore || loading) return;
    try {
      setLoading(true);
      const response = await Fetcher.searchByRandom(searchQuery, pagenum);
      
      if (response.Response === "False") {
        setHasMore(false);
        return;
      }

      if (Array.isArray(response.Search)) {
        setData((prev) => {
          const newItems = response.Search.filter(
            (item: Movie) => !prev.some((prevItem) => prevItem.imdbID === item.imdbID)
          );
          return [...prev, ...newItems];
        });
        setHasMore(data.length < response.totalResults );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setData([]);
    setPagenum(1);
    setHasMore(true);
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery) {
      FetchData(pagenum);
    }
  }, [pagenum, searchQuery]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPagenum((prev) => prev + 1);
    }
  }, [inView]);

  return (
    <div className="mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 gap-x-6 px-4">
      {data.map((movie: Movie, index: number) => (
        <div 
          key={movie.imdbID}
          onClick={() => {
            setSearchType("movie-id")
            setSearchQuery(movie.imdbID)
          }}
          className="aspect-[2/3] relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden"
        >
          <img 
            src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
            alt={movie.Title}
            className="object-cover hover:scale-110 hover:rotate-2 duration-200"
            width={300}
            height={450}
            loading={index < 6 ? "eager" : "lazy"}
          />
          <div className="absolute bottom-0 left-0 right-0 p-2 pb-4 bg-gradient-to-t from-black via-black/90 to-black/5">
            <h3 className="text-white text-lg font-semibold truncate">{movie.Title}</h3>
            <p className="text-gray-300 text-sm">{movie.Year} • {movie.Type} </p>
          </div>
        </div>
      ))}

      {/* Loading indicators with stable dimensions */}
      {hasMore && (
        <>
          {[...Array(4)].map((_, index) => (
            <div 
              key={`loading-${index}`}
              className="aspect-[2/3] bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg"
              ref={index === 3 ? ref : null}
            />
          ))}
        </>
      )}

      {/* No results state */}
      {!hasMore && data.length === 0 && (
        <div className="col-span-full text-center py-12 text-gray-500 dark:text-gray-400">
          No movies found for "{searchQuery}"
        </div>
      )}
    </div>
  );
}