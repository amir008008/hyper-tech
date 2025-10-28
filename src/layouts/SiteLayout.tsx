import { useEffect, useRef, useState } from "react";
import {  Outlet } from "react-router-dom";
import { useTheme } from "@/brand";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

const C = { highlight: "#eb6101" };

export default function SiteLayout() {
  const { theme, setTheme } = useTheme();
  const headerRef = useRef<HTMLElement>(null);

  // Measure header height -> expose --header-h so anchors can offset correctly
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const set = () =>
      document.documentElement.style.setProperty("--header-h", `${el.offsetHeight}px`);

    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    window.addEventListener("resize", set);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", set);
    };
  }, []);

  // Scroll spy: track which section is in view
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));
  
    const header = document.querySelector<HTMLElement>("#site-header");
    const headerHeight = header ? header.offsetHeight : 80;
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        // must be pixel or percent — not CSS variable
        rootMargin: `-${headerHeight}px 0px 0px 0px`,
        threshold: 0.3,
      }
    );
  
    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);
  

  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh" }}>
      {/* BRAND MASTHEAD (Navbar) */}
      <header
        ref={headerRef}
        id="site-header"
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
            {["services", "projects", "visuals", "about"].map((id) => {
              const isActive = activeSection === id;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`text-sm transition-opacity rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]
                    ${isActive ? "font-semibold text-[var(--accent)] opacity-100" : "opacity-70 hover:opacity-100"}`}
                >
                  {id[0].toUpperCase() + id.slice(1)}
                </a>
              );
            })}
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


    </div>
  );
}
