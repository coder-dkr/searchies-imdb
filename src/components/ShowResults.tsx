import { useMemo } from "react";
import { useSearch } from "../hooks/useSearch";
import { Bulk, ID, Title } from "./results";

export default function ShowResults() {
  const { searchType, searchQuery , showresults } = useSearch();

  if  (searchQuery.trim() === "" || !showresults) {
    return <div>Search Something...</div>;
  }

  const RenderedComponent = useMemo(() => {
    switch (searchType) {
      case "movie-bulk":
        return <Bulk />;
      case "movie-id":
        return <ID />;
      case "movie-title":
        return <Title />;
      default:
        return null;
    }
  }, [searchQuery]);
  return <>{RenderedComponent}</>;
}
