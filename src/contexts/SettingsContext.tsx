import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";
type FontSize = "sm" | "md" | "lg" | "xl";

interface SettingsContextType {
  theme: Theme;
  toggleTheme: () => void;
  fontSize: FontSize;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

const FONT_SIZES: FontSize[] = ["sm", "md", "lg", "xl"];

const FONT_SIZE_CSS: Record<FontSize, string> = {
  sm: "13px",
  md: "15px",
  lg: "17px",
  xl: "19px",
};

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("cp-theme") as Theme) || "dark";
  });

  const [fontSize, setFontSize] = useState<FontSize>(() => {
    return (localStorage.getItem("cp-fontsize") as FontSize) || "md";
  });

  // Apply theme class to <html>
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    if (theme === "light") root.classList.add("light");
    localStorage.setItem("cp-theme", theme);
  }, [theme]);

  // Apply font size to <html>
  useEffect(() => {
    document.documentElement.style.fontSize = FONT_SIZE_CSS[fontSize];
    localStorage.setItem("cp-fontsize", fontSize);
  }, [fontSize]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const increaseFontSize = () => {
    setFontSize((f) => {
      const idx = FONT_SIZES.indexOf(f);
      return FONT_SIZES[Math.min(idx + 1, FONT_SIZES.length - 1)];
    });
  };

  const decreaseFontSize = () => {
    setFontSize((f) => {
      const idx = FONT_SIZES.indexOf(f);
      return FONT_SIZES[Math.max(idx - 1, 0)];
    });
  };

  return (
    <SettingsContext.Provider value={{ theme, toggleTheme, fontSize, increaseFontSize, decreaseFontSize }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
