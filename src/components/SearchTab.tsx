import { useEffect, useState } from "preact/hooks";
import { useSearch, type SearchType } from "../hooks/useSearch";
import { Search } from "lucide-react";

export default function SearchTab() {
  const { searchType, setSearchType , setSearchQuery , searchQuery, setShowresults  } = useSearch();
  const [placeholder, setPlaceholder] = useState("");
  const [query, setQuery] = useState<string>("");

  const handleSearchType = (e: MouseEvent) => {
    const target = e.currentTarget as HTMLLabelElement;
    const input = target.querySelector(
      "input[type=radio]"
    ) as HTMLInputElement | null;

    if (input) {
      setSearchType(input.id as SearchType);
    }
  };

  useEffect(() => {
    const selectedInput = document.querySelector<HTMLInputElement>(
      `input[type=radio][id="${searchType}"]`
    );
    setPlaceholder(selectedInput?.dataset.value || "");
  }, [searchType]);

  const GoSearch = () => {
    if(query === "" ) {
      alert("Enter something!");
      return;
    }
    setSearchQuery(query)
    setShowresults(true)
  }

  useEffect(() => {
    setQuery(searchQuery)
  } , [searchQuery])

  useEffect(() => {
    if(query.trim() === ""){
      setShowresults(false)
    }
  },[query])

  return (
    <section className="container mx-auto px-4 py-8 flex items-center justify-center flex-col gap-y-5">
      <h1 className="text-2xl font-bold">Search By :</h1>
      <div className="flex items-center justify-center gap-10">
        {[
          { id: "movie-id", label: "Movie ID", value: "by movie id" },
          { id: "movie-title", label: "Movie Title", value: "by movie title" },
          { id: "movie-bulk", label: "∞ Scroll", value: "random" },
        ].map(({ id, label, value }) => (
          <label
            key={id}
            onClick={handleSearchType}
            htmlFor={id}
            className="flex flex-col justify-center items-center gap-2 cursor-pointer"
          >
            <input
              type="radio"
              name="searchType"
              id={id}
              data-value={value}
              defaultChecked={id === searchType}
            />
            <p>{label}</p>
          </label>
        ))}
      </div>

    <div className={`relative w-fit mt-2`}>
      <input
        autofocus
        type="text"
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
        id="search-tab"
        placeholder={`Search ${placeholder}`}
        className="w-[500px] pr-12 bg-white border text-black font-mono py-3 px-4 outline-0 dark:border-0 rounded-3xl dark:bg-slate-800 dark:text-white"
      />
      <Search onClick={GoSearch} className={`absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer`} />
    </div> 
    </section>
  );
}
