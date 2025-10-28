#!/usr/bin/env bash
set -euo pipefail

# --- helpers ---
mk() { mkdir -p "$1"; }
writeln() { file="$1"; shift; if [[ -e "$file" ]]; then echo "skip  $file"; else printf "%s\n" "$@" > "$file"; echo "make  $file"; fi; }
heredoc() { # usage: heredoc path <<'TAG' ... TAG
  file="$1"; shift
  if [[ -e "$file" ]]; then echo "skip  $file"; else cat > "$file"; echo "make  $file"; fi
}

echo "Installing router (if missing)…"
npm pkg get dependencies.react-router-dom >/dev/null 2>&1 || npm i -E react-router-dom

echo "Creating folders…"
mk src/pages/Services/AI
mk src/pages/Services/Data
mk src/pages/Services/Cyber
mk src/pages/Projects/_templates
mk src/pages/Blog/_templates
mk src/pages/Legal/Privacy
mk src/pages/Legal/Terms
mk src/pages/Legal/Security
mk src/pages/Legal/DPA
mk src/pages/{Visuals,About,Careers,Blog,Contact,Status,Docs,Pricing,NotFound}
mk src/layouts
mk src/components/common
mk public

# --- brand.ts (theme + palette) ---
heredoc src/brand.ts <<'TS'
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
TS

# --- SiteLayout ---
heredoc src/layouts/SiteLayout.tsx <<'TS'
import { Link, NavLink, Outlet } from "react-router-dom";
import { useTheme } from "@/brand";
import { Sun, Moon } from "lucide-react";

export default function SiteLayout() {
  const { theme, setTheme } = useTheme();
  const link = "text-sm opacity-80 hover:opacity-100";
  const active = ({isActive}:{isActive:boolean}) => (isActive ? "font-semibold" : "");
  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh" }}>
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-black/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link to="/" aria-label="Hyper-Tech Home" className="flex items-center gap-3">
            <img
              src={theme === "dark" ? "/logo-white.png" : "/logo-dark.png"}
              alt="Hyper-Tech"
              className="h-10 w-auto"
            />
          </Link>
          <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
            <NavLink to="/services" className={`${link} ${active as any}`}>Services</NavLink>
            <NavLink to="/projects" className={`${link} ${active as any}`}>Projects</NavLink>
            <NavLink to="/visuals" className={`${link} ${active as any}`}>Visuals</NavLink>
            <NavLink to="/about" className={`${link} ${active as any}`}>About</NavLink>
            <NavLink to="/blog" className={`${link} ${active as any}`}>Blog</NavLink>
            <NavLink to="/docs" className={`${link} ${active as any}`}>Docs</NavLink>
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="inline-flex items-center justify-center rounded-lg border p-2"
              style={{ borderColor: "var(--border)" }}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>
      <main><Outlet /></main>
      <footer className="py-10" style={{ borderTop: `1px solid var(--border)` }}>
        <div className="mx-auto max-w-7xl px-4 text-sm" style={{ color: "var(--subtext)" }}>
          © {new Date().getFullYear()} Hyper-Tech • <Link to="/privacy">Privacy</Link> • <Link to="/terms">Terms</Link> • <Link to="/security">Security</Link> • <Link to="/dpa">DPA</Link> • <Link to="/status">Status</Link>
        </div>
      </footer>
    </div>
  );
}
TS

# --- router.tsx ---
heredoc src/router.tsx <<'TS'
import { createBrowserRouter } from "react-router-dom";
import SiteLayout from "@/layouts/SiteLayout";
import HyperTechHome from "@/HyperTechHome";

// lazy placeholders
const P = (name: string) => () => <div className="mx-auto max-w-5xl px-4 py-14"><h1 className="text-3xl font-bold mb-4">{name}</h1><p style={{color:'var(--subtext)'}}>This is a placeholder. Replace with real content.</p></div>;

export const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      { path: "/", element: <HyperTechHome /> },

      // Services
      { path: "/services", element: <P name="Services Overview" /> },
      { path: "/services/ai", element: <P name="AI Products & Copilots" /> },
      { path: "/services/data", element: <P name="Data Platforms" /> },
      { path: "/services/cyber", element: <P name="Cyber & Compliance" /> },

      // Projects
      { path: "/projects", element: <P name="Projects" /> },
      { path: "/projects/:slug", element: <P name="Project Case Study" /> },

      // Visuals / About / Careers
      { path: "/visuals", element: <P name="Interactive Visuals" /> },
      { path: "/about", element: <P name="About Hyper-Tech" /> },
      { path: "/careers", element: <P name="Careers" /> },

      // Blog
      { path: "/blog", element: <P name="Blog" /> },
      { path: "/blog/:slug", element: <P name="Blog Post" /> },

      // Docs / Pricing / Contact
      { path: "/docs", element: <P name="Docs" /> },
      { path: "/pricing", element: <P name="Pricing" /> },
      { path: "/contact", element: <P name="Contact" /> },

      // Legal & status
      { path: "/privacy", element: <P name="Privacy Policy" /> },
      { path: "/terms", element: <P name="Terms of Service" /> },
      { path: "/security", element: <P name="Security" /> },
      { path: "/dpa", element: <P name="Data Processing Addendum" /> },
      { path: "/status", element: <P name="Status" /> },

      // 404
      { path: "*", element: <P name="404 — Not found" /> },
    ],
  },
]);
TS

# --- Example pages with richer placeholders (optional deep pages) ---
heredoc src/pages/Services/AI/index.tsx <<'TS'
export default function AIPage() {
  return <div className="mx-auto max-w-5xl px-4 py-14">
    <h1 className="text-3xl font-bold mb-4">AI Products & Copilots</h1>
    <p style={{color:'var(--subtext)'}}>Scope, evaluate, and ship AI features with governance, evals, and safety.</p>
  </div>;
}
TS

heredoc src/pages/Projects/_templates/case-study.md <<'MD'
# Case Study Title
- **Client:** …
- **Problem:** …
- **Solution:** …
- **Stack:** …
- **Outcome:** …

Write the narrative here. Replace this file when you add real case studies.
MD

heredoc src/pages/Blog/_templates/post.md <<'MD'
# Post Title
> YYYY-MM-DD

Intro…

## Section
Content…
MD

# --- public assets placeholders ---
writeln public/robots.txt "User-agent: *" "Allow: /" "Sitemap: /sitemap.txt"
writeln public/sitemap.txt "# Add your real URLs here" "/"

# --- Example main.router.tsx (safe copy so you can compare & then replace main.tsx yourself) ---
heredoc src/main.router.tsx <<'TS'
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "@/router";
import "@/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
TS

echo
echo "Scaffold complete."
echo "Next steps:"
echo "1) Replace src/main.tsx content with src/main.router.tsx (or rename it to main.tsx)."
echo "2) Ensure /public/logo-dark.png and /public/logo-white.png (500x250) exist."
echo "3) npm run dev"
