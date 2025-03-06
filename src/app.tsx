import Navbar from "./components/Navbar";
import SearchTab from "./components/SearchTab";
import ShowResults from "./components/ShowResults";
import { SearchProvider } from "./hooks/useSearch";

export function App() {
  return (
    <main class={`flex flex-col justify-center items-center`}>
      <SearchProvider>
        <Navbar />
        <SearchTab />
        <ShowResults />
      </SearchProvider>
    </main>
  );
}
