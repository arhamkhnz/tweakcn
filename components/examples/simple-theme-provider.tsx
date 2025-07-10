import React, { createContext, useContext, useEffect, useState } from "react";

/**
 * Basic theme switcher that relies on CSS variables.
 * Pass an object of themes where each theme maps variable
 * names (without the leading --) to CSS values.
 */
export type ThemeMap = Record<string, Record<string, string>>;

interface ThemeProviderProps {
  themes: ThemeMap;
  defaultTheme: string;
  disabled?: boolean;
  children: React.ReactNode;
}

interface ThemeContextValue {
  theme: string;
  setTheme: (name: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function SimpleThemeProvider({
  themes,
  defaultTheme,
  disabled = false,
  children,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (!root) return;

    // Remove any previously set variables
    Object.keys(themes[theme] || {}).forEach((key) => {
      root.style.removeProperty(`--${key}`);
    });

    if (disabled) return;

    const styles = themes[theme];
    if (!styles) return;

    Object.entries(styles).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }, [theme, disabled, themes]);

  const value = { theme, setTheme };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useSimpleTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useSimpleTheme must be used within SimpleThemeProvider");
  return ctx;
}
