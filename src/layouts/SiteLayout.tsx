"use client";

import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "@/brand";
import { Input } from "@/components/ui/input";
import { Sun, Moon } from "lucide-react";

const C = { highlight: "#eb6101" };
const MOTTO = "Practical AI. Measurable outcomes.";
const MAILTO = "mailto:amir_sh@outlook.my";

export default function SiteLayout() {
  const { theme, setTheme } = useTheme();
  const headerRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState<string>("");

  // expose --header-h for anchor offset
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

  // scroll spy
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));
    const header = document.querySelector<HTMLElement>("#site-header");
    const headerHeight = header ? header.offsetHeight : 80;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveSection(e.target.id)),
      { rootMargin: `-${headerHeight}px 0px 0px 0px`, threshold: 0.3 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // global CTA wiring
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest<HTMLElement>('[data-cta="email"]');
      if (el) {
        e.preventDefault();
        window.location.href = MAILTO;
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh" }}>
      <header
        ref={headerRef}
        id="site-header"
        className="sticky top-0 z-40 bg-[var(--bg)]/70 backdrop-blur border-b"
        style={{ borderColor: "var(--border)" }}
      >
        {/* same horizontal padding as hero (px-4) */}
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 pt-3 pb-6 md:pt-4 md:pb-10">
          {/* Brand + Motto */}
          <a href="/" aria-label="Hyper-Tech Home" className="flex items-center">
          <img
            src={theme === "dark" ? "/logodarkAI.png" : "/logowhiteAI.png"}
            alt="Hyper-Tech logo"
            className="w-auto h-[clamp(64px,7.2vw,96px)] drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
            style={{ marginBottom: "-3px" }}
            loading="eager"
            decoding="async"
          />

            <span className="ml-3 hidden md:flex flex-col leading-tight select-none">
              <span className="text-[14px] md:text-[15px] font-medium tracking-wide motto-prism w-auto max-w-max">
                {MOTTO}
              </span>
            </span>
          </a>

          {/* Nav */}
          <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
            {["services", "projects", "visuals", "about"].map((id) => {
              const isActive = activeSection === id;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`text-sm transition-opacity
                    ${isActive ? "font-semibold text-[var(--accent)] opacity-100" : "opacity-70 hover:opacity-100"}`}
                >
                  {id[0].toUpperCase() + id.slice(1)}
                </a>
              );
            })}
          </nav>

          {/* Right utilities */}
          <div className="flex items-center gap-2">
            <Input
              placeholder="Your email"
              className="hidden h-9 w-40 md:block"
              style={{ background: "var(--card)", color: "var(--text)" }}
            />
            <a
              href={MAILTO}
              data-cta="email"
              className="h-9 inline-flex items-center justify-center rounded-xl px-3 text-sm font-medium"
              style={{ background: C.highlight, color: "#fff" }}
            >
              Contact
            </a>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="inline-flex items-center rounded-lg border p-2"
              style={{ borderColor: "var(--border)" }}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      <main><Outlet /></main>

      <style>{`
        .motto-prism{
          background-image: linear-gradient(var(--subtext), var(--subtext));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
      `}</style>
    </div>
  );
}
