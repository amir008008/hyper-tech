import { Link, NavLink, Outlet } from "react-router-dom";
import { useTheme } from "@/brand";
import { Sun, Moon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
/**
 * HYPER-TECH Homepage (brand + a11y + theme)
 */

// Brand palette
const C = {
  primary: "#1e6c69", // teal
  accent: "#2893b6", // azure
  highlight: "#eb6101", // hyper orange
  bg: "#0a0e11", // dark bg
};

// Light/Dark neutrals
const LIGHT = {
  bg: "#fafafa",
  text: "#0b1320",
  subtext: "#4b5563",
  card: "#ffffff",
  border: "rgba(3,7,18,0.08)",
};
const DARK = {
  bg: C.bg,
  text: "#ffffff",
  subtext: "rgba(255,255,255,0.74)",
  card: "rgba(255,255,255,0.06)",
  border: "rgba(255,255,255,0.12)",
};

export default function SiteLayout() {
  const { theme, setTheme } = useTheme();
  const link = "text-sm opacity-80 hover:opacity-100";
  const active = ({isActive}:{isActive:boolean}) => (isActive ? "font-semibold" : "");
  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh" }}>
            {/* BRAND MASTHEAD (Navbar + small reveal rail) */}
            <header
        className="sticky top-0 z-40 bg-[var(--bg)]/70 backdrop-blur border-b"
        style={{ borderColor: "var(--border)" }}
      >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-8 py-3 md:py-5">
          <a href="#" aria-label="Hyper-Tech Home" className="flex items-center">
              <img
                  src={theme === "dark" ? "/logodark.png" : "/logowhite.png"}
                  alt="Hyper-Tech"
                  className="h-[64px] md:h-[76px] w-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
              />
          </a>

          <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
            {["services", "projects", "visuals", "about"].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className="text-sm opacity-80 hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded"
              >
                {id[0].toUpperCase() + id.slice(1)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Input
              placeholder="Your email"
              className="hidden h-9 w-40 md:block"
              aria-label="Your email"
              style={{ background: "var(--card)", color: "var(--text)" }}
            />
            <Button className="h-9 rounded-xl" style={{ background: C.highlight, color: "#fff" }}>
              Contact
            </Button>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="inline-flex items-center justify-center rounded-lg border p-2 focus:outline-none focus-visible:ring-2"
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
