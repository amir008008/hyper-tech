export const BRAND = {
  primary: "#1e6c69", // teal
  accent: "#2893b6",  // azure
  highlight: "#eb6101", // hyper orange
  darkBg: "#0a0e11",
  lightBg: "#f8f6f2",   // matches logo card
};

export const LIGHT = {
  bg: BRAND.lightBg,
  text: "#0b1320",
  subtext: "#4b5563",
  card: "#ffffff",
  border: "rgba(3,7,18,0.08)",
};

export const DARK = {
  bg: BRAND.darkBg,
  text: "#ffffff",
  subtext: "rgba(255,255,255,0.74)",
  card: "rgba(255,255,255,0.06)",
  border: "rgba(255,255,255,0.12)",
};

import { useEffect, useState } from "react";
export function useTheme() {
  const prefersDark =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useState<"dark" | "light">(prefersDark ? "dark" : "light");

  useEffect(() => {
    const root = document.documentElement;
    const T = theme === "dark" ? DARK : LIGHT;
    root.style.setProperty("--bg", T.bg);
    root.style.setProperty("--text", T.text);
    root.style.setProperty("--subtext", T.subtext);
    root.style.setProperty("--card", T.card);
    root.style.setProperty("--border", T.border);
    root.style.setProperty("--primary", BRAND.primary);
    root.style.setProperty("--accent", BRAND.accent);
    root.style.setProperty("--highlight", BRAND.highlight);
  }, [theme]);

  return { theme, setTheme };
}
