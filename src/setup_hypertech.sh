#!/usr/bin/env bash
set -euo pipefail

# --- helpers ---
mk() { mkdir -p "$1"; }
writeln() { file="$1"; shift; if [[ -e "$file" ]]; then echo "skip  $file"; else printf "%s\n" "$@" > "$file"; echo "make  $file"; fi; }
heredoc() { # usage: heredoc path <<'TAG' ... TAG
  file="$1"; shift
  if [[ -e "$file" ]]; then echo "skip  $file"; else cat > "$file"; echo "make  $file"; fi
}

echo "Installing react-router-dom (if missing)…"
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
mk src
mk public

# --- brand.ts (theme + palette + useTheme) ---
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
    root.classList.toggle("dark", theme === "dark");
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

const P = ({ name }: { name: string }) => (
  <div className="mx-auto max-w-5xl px-4 py-14">
    <h1 className="mb-4 text-3xl font-bold">{name}</h1>
    <p style={{ color: "var(--subtext)" }}>This is a placeholder. Replace with real content.</p>
  </div>
);

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

# --- HyperTechHome.tsx (your homepage with brand + glitch effect, using useTheme from brand.ts) ---
heredoc src/HyperTechHome.tsx <<'TS'
"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useTheme, LIGHT, DARK } from "@/brand";

import {
  Cpu, Bot, ShieldCheck, Rocket, ChartBar, Code2, Sparkles, Database,
  Globe2, GitBranch, Zap, Sun, Moon,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";

/** Brand palette (local shortcuts) */
const C = {
  primary: "#1e6c69",
  accent: "#2893b6",
  highlight: "#eb6101",
};

const genData = () =>
  Array.from({ length: 24 }).map((_, i) => ({
    t: \`\${i}:00\`,
    tokens: Math.round(800 + 400 * Math.sin(i / 2) + Math.random() * 120),
    latency: Math.round(120 + 60 * Math.cos(i / 3) + Math.random() * 40),
  }));

const Pill = ({ icon: Icon, label }: { icon: any; label: string }) => (
  <div
    className="flex items-center gap-2 rounded-full border px-3 py-1 text-xs md:text-sm"
    style={{ borderColor: "var(--border)", background: "var(--card)" }}
  >
    <Icon className="h-4 w-4" aria-hidden="true" />
    <span>{label}</span>
  </div>
);

const projects = [
  { title: "InsightGrid", desc: "Realtime analytics fabric for enterprise KPIs with AI copilot.", tags: ["AI Copilot", "Streaming", "E2E"] },
  { title: "SentinelX", desc: "Cyber posture dashboard with anomaly detection and playbooks.", tags: ["Security", "LLM", "SOAR"] },
  { title: "AtlasOps", desc: "Geospatial ops console with globe viz and incident routing.", tags: ["Geospatial", "WebGL", "Realtime"] },
  { title: "Quanta", desc: "Orchestrate data pipelines and embeddings at scale.", tags: ["Data", "Embeddings", "Pipelines"] },
];

function useLiveChartSeries(length = 56) {
  const [series, setSeries] = useState(
    Array.from({ length }, (_, i) => ({
      t: i,
      tokens:
        800 +
        Math.round(130 * Math.sin(i / 3.4)) +
        Math.round(90 * Math.cos(i / 6.2)) +
        Math.round(Math.random() * 30),
      latency:
        120 +
        Math.round(40 * Math.cos(i / 4.7)) +
        Math.round(15 * Math.sin(i / 2.3)) +
        Math.round(Math.random() * 10),
    }))
  );

  useEffect(() => {
    let rafId: number;
    let acc = 0;
    let lastT = series[series.length - 1]?.t ?? 0;
    const loop = () => {
      acc += 16;
      if (acc >= 600) {
        acc = 0;
        lastT += 1;
        setSeries(prev => {
          const next = prev.slice(1);
          next.push({
            t: lastT,
            tokens:
              800 +
              Math.round(130 * Math.sin(lastT / 3.4)) +
              Math.round(90 * Math.cos(lastT / 6.2)) +
              Math.round(Math.random() * 30),
            latency:
              120 +
              Math.round(40 * Math.cos(lastT / 4.7)) +
              Math.round(15 * Math.sin(lastT / 2.3)) +
              Math.round(Math.random() * 10),
          });
          return next;
        });
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return series;
}

export default function HyperTechHome() {
  const data = useMemo(genData, []);
  const { theme, setTheme } = useTheme();
  const live = useLiveChartSeries(56);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden" style={{ background: "var(--bg)", color: "var(--text)" }}>
      {/* Subtle brand auras */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-20 top-[-10%] h-72 w-72 rounded-full blur-[100px]" style={{ background: \`\${C.primary}33\` }} />
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full blur-[100px]" style={{ background: \`\${C.accent}33\` }} />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full blur-[100px]" style={{ background: \`\${C.highlight}24\` }} />
      </div>

      {/* BRAND MASTHEAD */}
      <header className="sticky top-0 z-40 bg-[var(--bg)]/70 backdrop-blur border-b" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-8 py-3 md:py-5">
          <a href="#" aria-label="Hyper-Tech Home" className="flex items-center">
            <img
              src={theme === "dark" ? "/logo-white.png" : "/logo-dark.png"}
              alt="Hyper-Tech"
              className="h-[64px] md:h-[76px] w-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
            />
          </a>

          <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
            {["services", "projects", "visuals", "about"].map((id) => (
              <a key={id} href={\`#\${id}\`} className="text-sm opacity-80 hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded">
                {id[0].toUpperCase() + id.slice(1)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Input placeholder="Your email" className="hidden h-9 w-40 md:block" aria-label="Your email" style={{ background: "var(--card)", color: "var(--text)" }} />
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

      {/* HERO */}
      <section className="relative mx-auto max-w-7xl px-4 pb-16 pt-6 md:pt-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[-1] h-32" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.06), rgba(0,0,0,0) 60%)" }} />
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
              We build{" "}
              <span className="brand-gradient glitch" data-text="AI-first">
                AI-first
              </span>{" "}
              platforms for the next decade.
            </motion.h1>
            <p className="mt-4 max-w-xl md:text-lg" style={{ color: "var(--subtext)" }}>
              Hyper-Tech is a collective of senior engineers, PMs, and designers delivering high-impact software:
              data platforms, cyber dashboards, and AI copilots.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Pill icon={Bot} label="LLM Apps" />
              <Pill icon={Database} label="Data Engineering" />
              <Pill icon={ShieldCheck} label="Cyber & Governance" />
              <Pill icon={ChartBar} label="Analytics" />
              <Pill icon={Globe2} label="WebGL/Maps" />
            </div>

            <style>{`
              :root{
                --brand-primary: ${C.primary};
                --brand-accent: ${C.accent};
                --brand-highlight: ${C.highlight};
              }
              .brand-gradient{
                background-image: linear-gradient(90deg, var(--brand-accent), var(--brand-primary));
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
                -webkit-text-fill-color: transparent;
              }
              .glitch{ position:relative; display:inline-block; }
              .glitch::before, .glitch::after{
                content: attr(data-text);
                position:absolute; left:0; top:0;
                pointer-events:none; mix-blend-mode: normal;
              }
              .glitch::before{
                text-shadow: 1px 0 var(--brand-accent);
                animation: gl1 2.1s infinite linear;
              }
              .glitch::after{
                text-shadow: -1px 0 var(--brand-highlight);
                animation: gl2 2.1s infinite linear;
              }
              @keyframes gl1{
                0%,100%{ clip-path: inset(0 0 0 0); transform: translate(0,0); }
                10%{ clip-path: inset(80% 0 0 0); transform: translate(1px,-1px); }
                25%{ clip-path: inset(0 0 70% 0); transform: translate(-1px,1px); }
                40%{ clip-path: inset(40% 0 40% 0); transform: translate(1px,0); }
                55%{ clip-path: inset(5% 0 85% 0); transform: translate(0,1px); }
                75%{ clip-path: inset(60% 0 20% 0); transform: translate(-1px,0); }
              }
              @keyframes gl2{
                0%,100%{ clip-path: inset(0 0 0 0); transform: translate(0,0); }
                12%{ clip-path: inset(0 0 85% 0); transform: translate(-1px,1px); }
                28%{ clip-path: inset(70% 0 0 0); transform: translate(1px,-1px); }
                45%{ clip-path: inset(20% 0 60% 0); transform: translate(0,1px); }
                62%{ clip-path: inset(85% 0 5% 0); transform: translate(1px,0); }
                82%{ clip-path: inset(30% 0 40% 0); transform: translate(-1px,-1px); }
              }
              @media (prefers-reduced-motion: reduce){
                .glitch::before, .glitch::after{ animation: none !important; display:none; }
              }
            `}</style>

            <div className="mt-8 flex gap-3">
              <Button className="rounded-xl" style={{ background: C.highlight, color: "#fff", boxShadow: "0 8px 24px rgba(235,97,1,0.35)" }}>
                Start a Project
              </Button>
              <Button variant="outline" className="rounded-xl" style={{ borderColor: "var(--border)", background: "transparent" }}>
                Our Work
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-6" style={{ color: "var(--subtext)" }}>
              <div className="flex items-center gap-2"><Zap className="h-4 w-4" aria-hidden /> <span>Fast iterations</span></div>
              <div className="flex items-center gap-2"><GitBranch className="h-4 w-4" aria-hidden /> <span>GitHub native</span></div>
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" aria-hidden /> <span>Security by design</span></div>
            </div>
          </div>

          {/* Right: Animated metric card */}
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} className="relative">
            <div className="relative rounded-2xl p-6 shadow-2xl" style={{ background: `linear-gradient(180deg, var(--card), transparent)`, border: `1px solid var(--border)` }}>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${C.accent}26` }}>
                  <Cpu className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <div className="text-sm" style={{ color: "var(--subtext)" }}>Demo: Inference Telemetry</div>
                  <div className="text-lg font-semibold">Tokens vs. Latency</div>
                </div>
              </div>
              <div className="h-56 w-full" role="img" aria-label="Area chart showing tokens and latency over time">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={live} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={C.accent} stopOpacity={0.5} />
                        <stop offset="95%" stopColor={C.accent} stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={C.highlight} stopOpacity={0.5} />
                        <stop offset="95%" stopColor={C.highlight} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="t" hide />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{
                        background: theme === "dark" ? DARK.bg : LIGHT.bg,
                        border: `1px solid ${theme === "dark" ? DARK.border : LIGHT.border}`,
                        borderRadius: 12,
                        color: theme === "dark" ? "#fff" : LIGHT.text,
                      }}
                      labelStyle={{ color: "#9ca3af" }}
                    />
                    <Area type="monotone" dataKey="tokens" stroke={C.accent} fillOpacity={1} fill="url(#g1)" strokeWidth={2} />
                    <Area type="monotone" dataKey="latency" stroke={C.highlight} fillOpacity={1} fill="url(#g2)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-xs" style={{ color: "var(--subtext)" }}>
                <div className="rounded-lg p-2" style={{ background: "var(--card)", border: `1px solid var(--border)` }}>Throughput ↑</div>
                <div className="rounded-lg p-2" style={{ background: "var(--card)", border: `1px solid var(--border)` }}>P95 Latency ↓</div>
                <div className="rounded-lg p-2" style={{ background: "var(--card)", border: `1px solid var(--border)` }}>Cost / 1k tok</div>
              </div>
            </div>
            <motion.div className="absolute -right-4 -top-4 rounded-xl px-3 py-1 text-xs backdrop-blur" style={{ border: `1px solid ${C.accent}4d`, background: `${C.accent}1a` }} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <div className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5" aria-hidden /> Generative-Ready</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="mx-auto max-w-7xl px-4 py-12 md:py-20">
        <div className="mb-8 flex items-center gap-2">
          <div className="h-6 w-1 rounded" style={{ background: C.accent }} />
          <h2 className="text-2xl font-semibold md:text-3xl">What we do</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Bot, title: "AI Products", desc: "LLM apps, RAG, fine-tuning, evals, safety, and prompt tooling.", badge: "Copilots" },
            { icon: Database, title: "Data Platforms", desc: "Ingestion → Lakehouse → Feature store → ML Ops with governance.", badge: "Data Mesh" },
            { icon: ShieldCheck, title: "Cyber & Compliance", desc: "Dashboards, risk registers, IAM, and audit-ready workflows.", badge: "Zero-Trust" },
          ].map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 * i }}>
              <Card className="h-full" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <CardHeader className="flex items-center gap-3">
                  <div className="rounded-xl p-2" style={{ background: \`\${C.primary}22\` }}>
                    <s.icon className="h-5 w-5" aria-hidden />
                  </div>
                  <CardTitle className="text-lg">{s.title}</CardTitle>
                  <Badge className="ml-auto rounded-full" style={{ background: \`\${C.accent}2b\`, color: C.accent }}>
                    {s.badge}
                  </Badge>
                </CardHeader>
                <CardContent className="text-sm" style={{ color: "var(--subtext)" }}>{s.desc}</CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="mx-auto max-w-7xl px-4 py-12 md:py-20">
        <div className="mb-8 flex items-center gap-2">
          <div className="h-6 w-1 rounded" style={{ background: C.highlight }} />
          <h2 className="text-2xl font-semibold md:text-3xl">Selected Projects</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 * i }}>
              <Card className="group h-full" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{p.title}</CardTitle>
                    <div className="flex gap-2">
                      {p.tags.map((t) => (
                        <Badge key={t} className="rounded-full" style={{ background: "var(--bg)", border: `1px solid var(--border)`, color: "var(--subtext)" }}>
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p style={{ color: "var(--subtext)" }}>{p.desc}</p>
                  <div className="mt-4 flex gap-3">
                    <Button size="sm" className="rounded-xl" style={{ background: \`\${C.accent}2b\` }}>
                      <Code2 className="mr-2 h-4 w-4" aria-hidden />
                      Case Study
                    </Button>
                    <Button size="sm" variant="outline" className="rounded-xl" style={{ borderColor: "var(--border)", background: "transparent" }}>
                      <Rocket className="mr-2 h-4 w-4" aria-hidden />
                      Live Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* VISUALS */}
      <section id="visuals" className="mx-auto max-w-7xl px-4 py-12 md:py-20">
        <div className="mb-8 flex items-center gap-2">
          <div className="h-6 w-1 rounded" style={{ background: C.primary }} />
          <h2 className="text-2xl font-semibold md:text-3xl">Interactive Visuals</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Card style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg"><ChartBar className="h-5 w-5" aria-hidden /> Model Telemetry</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-40 w-full" role="img" aria-label="Area chart showing tokens trend">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="g3" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={C.primary} stopOpacity={0.5} />
                        <stop offset="95%" stopColor={C.primary} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="t" hide />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{
                        background: theme === "dark" ? DARK.bg : LIGHT.bg,
                        border: `1px solid ${theme === "dark" ? DARK.border : LIGHT.border}`,
                        borderRadius: 12,
                        color: theme === "dark" ? "#fff" : LIGHT.text,
                      }}
                      labelStyle={{ color: "#9ca3af" }}
                    />
                    <Area type="monotone" dataKey="tokens" stroke={C.primary} fillOpacity={1} fill="url(#g3)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-3 text-sm" style={{ color: "var(--subtext)" }}>Track throughput, cost, and quality with built-in evals dashboards.</p>
            </CardContent>
          </Card>

          <Card style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg"><Globe2 className="h-5 w-5" aria-hidden /> Ops Console</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-40 w-full rounded-lg" style={{ background: \`\${C.accent}22\`, border: `1px solid var(--border)` }} />
              <p className="mt-3 text-sm" style={{ color: "var(--subtext)" }}>Geo-routed incidents and SLA-aware workflows across regions.</p>
            </CardContent>
          </Card>

          <Card style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg"><ShieldCheck className="h-5 w-5" aria-hidden /> Risk Register</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-40 w-full rounded-lg" style={{ background: \`\${C.highlight}22\`, border: `1px solid var(--border)` }} />
              <p className="mt-3 text-sm" style={{ color: "var(--subtext)" }}>Qualitative + quantitative risk scoring with audit history.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-7xl px-4 py-12 md:py-20">
        <div className="mb-8 flex items-center gap-2">
          <div className="h-6 w-1 rounded" style={{ background: C.accent }} />
          <h2 className="text-2xl font-semibold md:text-3xl">Our Stack</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-4">
          {[
            { icon: Bot, label: "LLMs", items: "OpenAI, vLLM, RAG, Evals" },
            { icon: Database, label: "Data", items: "ClickHouse, DuckDB, Spark, Iceberg" },
            { icon: Code2, label: "Frontend", items: "React, Next.js, Tailwind, WebGL" },
            { icon: ShieldCheck, label: "Security", items: "SSO, RBAC, Vault, Audit" },
          ].map((b, i) => (
            <motion.div key={b.label} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <div className="rounded-2xl p-4" style={{ background: "var(--card)", border: `1px solid var(--border)` }}>
                <div className="mb-2 flex items-center gap-2">
                  <div className="rounded-xl p-2" style={{ background: \`\${C.accent}22\` }}>
                    <b.icon className="h-5 w-5" aria-hidden />
                  </div>
                  <div className="font-semibold">{b.label}</div>
                </div>
                <div className="text-sm" style={{ color: "var(--subtext)" }}>
                  {b.items}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl p-6" style={{ background: \`linear-gradient(90deg, \${C.primary}14, \${C.accent}14)\`, border: \`1px solid var(--border)\` }}>
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h3 className="text-xl font-semibold">Have a challenge in data or AI?</h3>
              <p style={{ color: "var(--subtext)" }}>We can scope a 1-week discovery sprint and deliver a clickable prototype.</p>
            </div>
            <Button className="rounded-xl" style={{ background: C.highlight, color: "#fff" }}>
              <Sparkles className="mr-2 h-4 w-4" aria-hidden /> Book discovery
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10" style={{ borderTop: `1px solid var(--border)` }}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <a href="#" className="flex items-center gap-2" aria-label="Hyper-Tech Home">
              <img src={theme === "dark" ? "/logo-white.png" : "/logo-dark.png"} alt="Hyper-Tech logo" className="h-10 w-auto md:h-14" />
            </a>
            <div className="flex items-center gap-3">
              <Badge className="rounded-full" style={{ background: \`\${C.primary}26\`, color: C.primary }}>AI-focused</Badge>
              <Badge className="rounded-full" style={{ background: \`\${C.accent}26\`, color: C.accent }}>Cyber-ready</Badge>
              <Badge className="rounded-full" style={{ background: \`\${C.highlight}26\`, color: C.highlight }}>Data-driven</Badge>
            </div>
          </div>
          <div className="mt-6 text-xs" style={{ color: "var(--subtext)" }}>
            © {new Date().getFullYear()} Hyper-Tech. All rights reserved.
          </div>
        </div>
      </footer>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </div>
  );
}
TS

# --- Example deeper page & templates ---
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
writeln public/logo-dark.png "[placeholder image] replace with real 500x250 dark logo"
writeln public/logo-white.png "[placeholder image] replace with real 500x250 white logo"
# also drop alternate names in case older components referenced them
writeln public/logodark.png "[placeholder alias] replace with real logo"
writeln public/logowhite.png "[placeholder alias] replace with real logo"

# --- Minimal global CSS to ensure variables apply nicely ---
heredoc src/index.css <<'CSS'
:root { color-scheme: light dark; }
html, body, #root { height: 100%; }
body { margin: 0; background: var(--bg); color: var(--text); -webkit-font-smoothing: antialiased; }
* { box-sizing: border-box; }
CSS

# --- main.router.tsx (copy into main.tsx or replace) ---
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
echo "Scaffold files written."
echo "Next steps:"
echo "1) Replace src/main.tsx content with src/main.router.tsx (or rename it to main.tsx)."
echo "2) Place real logos at /public/logo-dark.png and /public/logo-white.png (500x250)."
echo "3) Ensure your alias '@' points to 'src' (Vite tsconfig paths or similar)."
echo "4) npm run dev"
