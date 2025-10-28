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

  // global CTA wiring: any element with data-cta="email"
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
      {/* NAVBAR */}
      <header
        ref={headerRef}
        id="site-header"
        className="sticky top-0 z-40 bg-[var(--bg)]/70 backdrop-blur border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-8 py-3 md:py-5">
          {/* Brand + Motto */}
          <a href="/" aria-label="Hyper-Tech Home" className="flex items-center">
            <img
              src={theme === "dark" ? "/logodark.png" : "/logowhite.png"}
              alt="Hyper-Tech logo"
              className="h-[64px] md:h-[76px] w-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
            />
            <span className="ml-3 hidden md:flex flex-col items-start leading-tight select-none">
              <span className="text-[12px] tracking-[0.18em] uppercase text-[var(--subtext)] font-semibold flex-none">
              </span>
              <span
                className="motto-prism text-[12px] md:text-[13px] font-medium tracking-wide flex-none w-auto max-w-max"
                aria-label="Company motto"
              >
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
                  className={`text-sm transition-opacity rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]
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
              aria-label="Your email"
              style={{ background: "var(--card)", color: "var(--text)" }}
            />
            {/* Contact button → email */}
            <a
              href={MAILTO}
              data-cta="email"
              className="h-9 inline-flex items-center justify-center rounded-xl px-3 text-sm font-medium"
              style={{ background: C.highlight, color: "#fff" }}
              aria-label="Email us"
            >
              Contact
            </a>
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

      {/* Text-only prism highlight */}
      <style>{`
        .motto-prism{
          position: relative;
          display: inline-block;
          background-image:
            linear-gradient(var(--subtext), var(--subtext)),
            linear-gradient(100deg, transparent 0%, rgba(255,255,255,.65) 10%, transparent 22%);
          background-size: 100% 100%, 250% 100%;
          background-repeat: no-repeat;
          background-position: 0 0, -220% 0;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
          animation: prismSweep 3.6s cubic-bezier(.22,.61,.36,1) infinite;
        }
        @keyframes prismSweep{
          0%   { background-position: 0 0, -220% 0; }
          12%  { background-position: 0 0, 120% 0; }
          100% { background-position: 0 0, 120% 0; }
        }
        @media (prefers-reduced-motion: reduce){
          .motto-prism{ 
            background-image: linear-gradient(var(--subtext), var(--subtext));
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
