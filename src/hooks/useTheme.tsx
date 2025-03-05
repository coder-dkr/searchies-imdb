import { createContext } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";

type ThemeType = "light" | "dark";

type ThemeContextType = {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  setTheme: () => {},
});

type ThemeProviderProps = {
  children: JSX.Element | JSX.Element[];
};

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<ThemeType>("dark");

  useEffect(() => {
    const body = document.documentElement;
    body.classList.remove("dark", "light");
    if (theme === "dark") body.classList.add("dark");
    else body.classList.add("light");
    body.style.color = theme === "light" ? "black" : "white";
    body.style.background = theme === "light" ? "white" : "black";
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  return useContext(ThemeContext);
};

export { ThemeProvider, useTheme };
