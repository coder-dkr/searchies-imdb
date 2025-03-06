import { createContext } from "preact";
import { useContext, useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";

type SearchType = "movie-id" | "movie-title" | "movie-bulk";

type SearchContextType = {
  searchType: SearchType;
  setSearchType: (theme: SearchType) => void;
  showresults: boolean,
  setShowresults:  (state: boolean) => void;
  searchQuery : string;
  setSearchQuery : (query : string) => void
};

const SearchContext = createContext<SearchContextType>({
    searchType: "movie-bulk",
    setSearchType: () => {},
    showresults : false,
    setShowresults : () => {},
    searchQuery : "",
    setSearchQuery : () => {}

});

type SearchProviderProps = {
  children: JSX.Element | JSX.Element[];
};

const SearchProvider = ({ children }: SearchProviderProps) => {
  const [searchType ,setSearchType] = useState<SearchType>("movie-bulk")
  const [showresults ,setShowresults] = useState<boolean>(false)
  const [searchQuery ,setSearchQuery] = useState<string>("")
  return (
    <SearchContext.Provider value={{ searchType, setSearchType , showresults , setShowresults , searchQuery , setSearchQuery}}>
      {children}
    </SearchContext.Provider>
  );
};

const useSearch = () => {
  return useContext(SearchContext);
};

export { SearchProvider, useSearch , type SearchType };
