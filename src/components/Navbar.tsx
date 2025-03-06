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
      <h1 className={`text-2xl font-bold text-yellow-900 dark:text-yellow-400`}>Searchies X <span className="text-red-500">IMdb</span></h1>
      <button onClick={handleThemeChange} className={`cursor-pointer`}>
        {theme === "dark" ? <Sun /> : <Moon />}
      </button>
    </nav>
  );
}
