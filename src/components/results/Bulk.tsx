import { useEffect, useState } from "preact/hooks";
import Fetcher from "../../api/omdb";
import { useSearch } from "../../hooks/useSearch";

type DataType = {
  Search: [];
  totalResults: string;
  Response: "string";
};

export default function Bulk() {
  const { searchQuery } = useSearch();
  const [data, setData] = useState<DataType>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function FetchData() {
      try {
        setLoading(true)
        const response = await Fetcher.searchByRandom(searchQuery);
        setData(response);
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    }
    FetchData();
  }, [searchQuery]);

  if (loading)
    return (
      <div className="flex flex-col items-center">
        <img
          src="https://i.gifer.com/ZZ5H.gif" // Example loader GIF
          alt="Verifying..."
          className="w-10 h-10"
        />
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Brewing latest seeds.
        </p>
      </div>
    );

  return <div>{data?.totalResults}</div>;
}
