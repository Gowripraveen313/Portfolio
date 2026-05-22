import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeType =
  | "neon-cyan"
  | "cyberpunk-magenta"
  | "retro-amber"
  | "emerald-matrix"
  | "amethyst-royal"
  | "sleek-light";

export interface ThemeConfig {
  id: ThemeType;
  name: string;
  primaryColor: string; // Tailwind representation or description
  colorHex: string; // Actual hex representation for display
}

export const themes: ThemeConfig[] = [
  { id: "neon-cyan", name: "Neon Cyan", primaryColor: "bg-cyan-400", colorHex: "#06b6d4" },
  { id: "cyberpunk-magenta", name: "Cyberpunk Midnight", primaryColor: "bg-pink-500", colorHex: "#ec4899" },
  { id: "retro-amber", name: "Retro Amber", primaryColor: "bg-amber-500", colorHex: "#f59e0b" },
  { id: "emerald-matrix", name: "Emerald Matrix", primaryColor: "bg-emerald-500", colorHex: "#10b981" },
  { id: "amethyst-royal", name: "Amethyst Royal", primaryColor: "bg-purple-600", colorHex: "#9333ea" },
  { id: "sleek-light", name: "Sleek Light", primaryColor: "bg-blue-600", colorHex: "#2563eb" },
];

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  customCursor: boolean;
  setCustomCursor: (enabled: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeType>(() => {
    const saved = localStorage.getItem("portfolio-theme");
    return (saved as ThemeType) || "neon-cyan";
  });

  const [customCursor, setCustomCursorState] = useState<boolean>(() => {
    const saved = localStorage.getItem("portfolio-custom-cursor");
    return saved !== null ? saved === "true" : true; // default to true
  });

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    localStorage.setItem("portfolio-theme", newTheme);
  };

  const setCustomCursor = (enabled: boolean) => {
    setCustomCursorState(enabled);
    localStorage.setItem("portfolio-custom-cursor", String(enabled));
  };

  useEffect(() => {
    const root = document.documentElement;
    
    // Apply data-theme attribute
    root.setAttribute("data-theme", theme);
    
    // Manage custom cursor active class
    if (customCursor) {
      root.classList.add("custom-cursor-active");
    } else {
      root.classList.remove("custom-cursor-active");
    }
  }, [theme, customCursor]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, customCursor, setCustomCursor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
