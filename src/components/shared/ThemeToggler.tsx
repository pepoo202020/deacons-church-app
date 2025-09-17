"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";

interface IThemeTogglerProps {
  isDashboardHeader?: boolean;
}

const ThemeToggler = ({ isDashboardHeader = false }: IThemeTogglerProps) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const root = window.document.documentElement;
    const initialTheme = root.classList.contains("dark") ? "dark" : "light";
    setTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    const root = window.document.documentElement;
    const newTheme = theme === "dark" ? "light" : "dark";
    root.classList.remove("light", "dark");
    root.classList.add(newTheme);
    setTheme(newTheme);
  };
  return isDashboardHeader ? (
    <Button variant="ghost" size="sm" onClick={toggleTheme}>
      {theme === "light" ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  ) : (
    <div>Enter</div>
  );
};

export default ThemeToggler;
