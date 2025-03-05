import { Sun, Moon } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = () => {
    if(theme === "dark" ) setTheme("light")
    else setTheme("dark")
  };

  return (
    <nav className={`w-full flex items-center justify-around py-3  bg-sky-200 dark:bg-sky-900 text-black dark:text-white`}>
      <h1 className={`text-2xl font-bold italic`}>Searchies X IMdb</h1>
      <button onClick={handleThemeChange} className={`cursor-pointer`}>
        {theme === "dark" ? <Sun /> : <Moon />}
      </button>
    </nav>
  );
}
