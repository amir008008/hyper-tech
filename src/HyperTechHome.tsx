"use client";

import { useEffect, useMemo, useState } from "react";
import { motion  } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import {
  Cpu,
  Bot,
  ShieldCheck,
  Rocket,
  ChartBar,
  Code2,
  Sparkles,
  Database,
  Globe2,
  GitBranch,
  Zap,
  Sun,
  Moon,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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


// Theme hook — respects system preference + manual toggle
function useTheme() {
  const prefersDark =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useState<"dark" | "light">(prefersDark ? "dark" : "light");
// inside useTheme() effect
useEffect(() => {
  const root = document.documentElement;
  const t = theme === "dark" ? DARK : LIGHT;
  root.style.setProperty("--bg", t.bg);
  root.style.setProperty("--text", t.text);
  root.style.setProperty("--subtext", t.subtext);
  root.style.setProperty("--card", t.card);
  root.style.setProperty("--border", t.border);
  root.style.setProperty("--primary", C.primary);
  root.style.setProperty("--accent", C.accent);
  root.style.setProperty("--highlight", C.highlight);

  // make Tailwind dark: utilities work everywhere
  root.classList.toggle("dark", theme === "dark");
}, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    const t = theme === "dark" ? DARK : LIGHT;
    root.style.setProperty("--bg", t.bg);
    root.style.setProperty("--text", t.text);
    root.style.setProperty("--subtext", t.subtext);
    root.style.setProperty("--card", t.card);
    root.style.setProperty("--border", t.border);
    root.style.setProperty("--primary", C.primary);
    root.style.setProperty("--accent", C.accent);
    root.style.setProperty("--highlight", C.highlight);
  }, [theme]);

  return { theme, setTheme };
}

// Demo dataset
const genData = () =>
  Array.from({ length: 24 }).map((_, i) => ({
    t: `${i}:00`,
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
  {
    title: "InsightGrid",
    desc: "Realtime analytics fabric for enterprise KPIs with AI copilot.",
    tags: ["AI Copilot", "Streaming", "E2E"],
  },
  {
    title: "SentinelX",
    desc: "Cyber posture dashboard with anomaly detection and playbooks.",
    tags: ["Security", "LLM", "SOAR"],
  },
  {
    title: "AtlasOps",
    desc: "Geospatial ops console with globe viz and incident routing.",
    tags: ["Geospatial", "WebGL", "Realtime"],
  },
  {
    title: "Quanta",
    desc: "Orchestrate data pipelines and embeddings at scale.",
    tags: ["Data", "Embeddings", "Pipelines"],
  },
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
      acc += 16; // ~60fps
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
  const live = useLiveChartSeries(56); // <- LIVE DATA FOR HERO



// Live data hook for the hero chart (adds a point ~every 500ms)
function useLiveSeries(n = 48) {
  const [series, setSeries] = useState(
    Array.from({ length: n }, (_, i) => ({
      t: i,
      tokens: 700 + Math.round(100 * Math.sin(i / 3)) + Math.round(Math.random() * 60),
    }))
  );


  useEffect(() => {
    let rafId: number;
    let last = series[series.length - 1]?.t ?? 0;
    let acc = 0;
    const step = (ts: number) => {
      // push a point roughly every 500ms
      acc += 16;
      if (acc >= 500) {
        acc = 0;
        last += 1;
        setSeries((prev) => {
          const next = prev.slice(1);
          const nextVal =
            700 +
            Math.round(120 * Math.sin(last / 4)) +
            Math.round(80 * Math.cos(last / 7)) +
            Math.round(Math.random() * 40);
          next.push({ t: last, tokens: nextVal });
          return next;
        });
      }
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return series;
}


  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      {/* Subtle brand auras */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -left-20 top-[-10%] h-72 w-72 rounded-full blur-[100px]"
          style={{ background: `${C.primary}33` }}
        />
        <div
          className="absolute right-0 top-1/3 h-72 w-72 rounded-full blur-[100px]"
          style={{ background: `${C.accent}33` }}
        />
        <div
          className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full blur-[100px]"
          style={{ background: `${C.highlight}24` }}
        />
      </div>

      {/* BRAND MASTHEAD (Navbar + small reveal rail) */}
      <header
        className="sticky top-0 z-40 bg-[var(--bg)]/70 backdrop-blur border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:py-4">
          <a href="#" aria-label="Hyper-Tech Home" className="flex items-center">
            <img
              src={theme === "dark" ? "/logodark.png" : "/logowhite.png"}
              alt="Hyper-Tech"
              className="h-[44px] w-auto md:h-[52px]"
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


      {/* HERO (hug the masthead; no top margin) */}
      <section className="relative mx-auto max-w-7xl px-4 pb-16 pt-6 md:pt-10">
        {/* subtle top gradient */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[-1] h-32"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.06), rgba(0,0,0,0) 60%)" }}
        />
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl"
            >
              We build{" "}
              <span
                style={{
                  backgroundImage: `linear-gradient(90deg, ${C.accent}, ${C.primary})`,
                  WebkitBackgroundClip: "text",
                  color: C.primary,
                }}
              >
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
            <div className="mt-8 flex gap-3">
              <Button
                className="rounded-xl"
                style={{ background: C.highlight, color: "#fff", boxShadow: "0 8px 24px rgba(235,97,1,0.35)" }}
              >
                Start a Project
              </Button>
              <Button
                variant="outline"
                className="rounded-xl"
                style={{ borderColor: "var(--border)", background: "transparent" }}
              >
                Our Work
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-6" style={{ color: "var(--subtext)" }}>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" aria-hidden /> <span>Fast iterations</span>
              </div>
              <div className="flex items-center gap-2">
                <GitBranch className="h-4 w-4" aria-hidden /> <span>GitHub native</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" aria-hidden /> <span>Security by design</span>
              </div>
            </div>
          </div>

          {/* Right: Animated metric card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div
              className="relative rounded-2xl p-6 shadow-2xl"
              style={{ background: `linear-gradient(180deg, var(--card), transparent)`, border: `1px solid var(--border)` }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${C.accent}26` }}>
                  <Cpu className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <div className="text-sm" style={{ color: "var(--subtext)" }}>
                    Demo: Inference Telemetry
                  </div>
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
                <div className="rounded-lg p-2" style={{ background: "var(--card)", border: `1px solid var(--border)` }}>
                  Throughput ↑
                </div>
                <div className="rounded-lg p-2" style={{ background: "var(--card)", border: `1px solid var(--border)` }}>
                  P95 Latency ↓
                </div>
                <div className="rounded-lg p-2" style={{ background: "var(--card)", border: `1px solid var(--border)` }}>
                  Cost / 1k tok
                </div>
              </div>
            </div>
            <motion.div
              className="absolute -right-4 -top-4 rounded-xl px-3 py-1 text-xs backdrop-blur"
              style={{ border: `1px solid ${C.accent}4d`, background: `${C.accent}1a` }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5" aria-hidden /> Generative-Ready
              </div>
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
            {
              icon: Bot,
              title: "AI Products",
              desc: "LLM apps, RAG, fine-tuning, evals, safety, and prompt tooling.",
              badge: "Copilots",
            },
            {
              icon: Database,
              title: "Data Platforms",
              desc: "Ingestion → Lakehouse → Feature store → ML Ops with governance.",
              badge: "Data Mesh",
            },
            {
              icon: ShieldCheck,
              title: "Cyber & Compliance",
              desc: "Dashboards, risk registers, IAM, and audit-ready workflows.",
              badge: "Zero-Trust",
            },
          ].map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * i }}
            >
              <Card className="h-full" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <CardHeader className="flex items-center gap-3">
                  <div className="rounded-xl p-2" style={{ background: `${C.primary}22` }}>
                    <s.icon className="h-5 w-5" aria-hidden />
                  </div>
                  <CardTitle className="text-lg">{s.title}</CardTitle>
                  <Badge className="ml-auto rounded-full" style={{ background: `${C.accent}2b`, color: C.accent }}>
                    {s.badge}
                  </Badge>
                </CardHeader>
                <CardContent className="text-sm" style={{ color: "var(--subtext)" }}>
                  {s.desc}
                </CardContent>
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
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * i }}
            >
              <Card className="group h-full" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{p.title}</CardTitle>
                    <div className="flex gap-2">
                      {p.tags.map((t) => (
                        <Badge
                          key={t}
                          className="rounded-full"
                          style={{ background: "var(--bg)", border: `1px solid var(--border)`, color: "var(--subtext)" }}
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p style={{ color: "var(--subtext)" }}>{p.desc}</p>
                  <div className="mt-4 flex gap-3">
                    <Button size="sm" className="rounded-xl" style={{ background: `${C.accent}2b` }}>
                      <Code2 className="mr-2 h-4 w-4" aria-hidden />
                      Case Study
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-xl"
                      style={{ borderColor: "var(--border)", background: "transparent" }}
                    >
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
              <CardTitle className="flex items-center gap-2 text-lg">
                <ChartBar className="h-5 w-5" aria-hidden /> Model Telemetry
              </CardTitle>
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
              <p className="mt-3 text-sm" style={{ color: "var(--subtext)" }}>
                Track throughput, cost, and quality with built-in evals dashboards.
              </p>
            </CardContent>
          </Card>

          <Card style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Globe2 className="h-5 w-5" aria-hidden /> Ops Console
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="h-40 w-full rounded-lg"
                style={{ background: `${C.accent}22`, border: `1px solid var(--border)` }}
              />
              <p className="mt-3 text-sm" style={{ color: "var(--subtext)" }}>
                Geo-routed incidents and SLA-aware workflows across regions.
              </p>
            </CardContent>
          </Card>

          <Card style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <ShieldCheck className="h-5 w-5" aria-hidden /> Risk Register
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="h-40 w-full rounded-lg"
                style={{ background: `${C.highlight}22`, border: `1px solid var(--border)` }}
              />
              <p className="mt-3 text-sm" style={{ color: "var(--subtext)" }}>
                Qualitative + quantitative risk scoring with audit history.
              </p>
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
            <motion.div
              key={b.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <div
                className="rounded-2xl p-4"
                style={{ background: "var(--card)", border: `1px solid var(--border)` }}
              >
                <div className="mb-2 flex items-center gap-2">
                  <div className="rounded-xl p-2" style={{ background: `${C.accent}22` }}>
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

        <div
          className="mt-10 rounded-2xl p-6"
          style={{
            background: `linear-gradient(90deg, ${C.primary}14, ${C.accent}14)`,
            border: `1px solid var(--border)`,
          }}
        >
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h3 className="text-xl font-semibold">Have a challenge in data or AI?</h3>
              <p style={{ color: "var(--subtext)" }}>
                We can scope a 1-week discovery sprint and deliver a clickable prototype.
              </p>
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
            <img
              src={theme === "dark" ? "/logodark.png" : "/logowhite.png"}
              alt="Hyper-Tech logo"
              className="h-7 w-auto"
            />
          </a>

            <div className="flex items-center gap-3">
              <Badge className="rounded-full" style={{ background: `${C.primary}26`, color: C.primary }}>
                AI-focused
              </Badge>
              <Badge className="rounded-full" style={{ background: `${C.accent}26`, color: C.accent }}>
                Cyber-ready
              </Badge>
              <Badge className="rounded-full" style={{ background: `${C.highlight}26`, color: C.highlight }}>
                Data-driven
              </Badge>
            </div>
          </div>
          <div className="mt-6 text-xs" style={{ color: "var(--subtext)" }}>
            © {new Date().getFullYear()} Hyper-Tech. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Reduced-motion support */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </div>
  );
}
