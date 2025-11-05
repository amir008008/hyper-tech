"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {  AnimatePresence } from "framer-motion";
import {  useInView } from "framer-motion";

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
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

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

// === Inlined copy (no copy.ts needed) ===
// === Inlined copy (brand voice; drop-in replacement) ===
type StoryItem = { y: string; t: string };

const BRAND: {
  heroSub: string;
  trustBullets: string[];
  story: StoryItem[];
  principles: [string, string][];
  team: {
    name: string;
    role: string;
    blurb: string;
  }[];
} = {
  heroSub:
    "We’re a senior engineering studio shipping AI, data, and security software. Small teams, weekly demos, transparent scope. Production or it doesn’t ship.",

  trustBullets: [
    "GitHub-first delivery: issues, PRs, tags, and changelogs",
    "Measured outcomes: latency, accuracy, cost per 1k tok",
    "Exit-friendly handover: docs, infra as code, and runbooks",
  ],

  story: [

  ],

  principles: [
    ["Outcomes over hype", "We prove value with dashboards, not decks."],
    ["Security by default", "Least privilege, audit trails, reproducible builds."],
    ["Write it down", "Decisions are versioned and linked to scope changes."],
    ["Own your exit", "Handover includes docs, IaC, and operational runbooks."],
    ["No gray projects", "We only work with reliable partners and clear governance."],
  ],

  team: [
    {
      name: "Shahrukh Amir",
      role: "Founder · R&D",
      blurb:
        "Lived in China for 12+ years. Experienced Product Manager at PowerChina Huadong. Serial entrepreneur and product leader building AI, data, and CV platforms across China and the Middle East. Masters, Zhejiang University.",
    },
    {
      name: "Thibault Jacquemin",
      role: "Communication Adviser · R&D",
      blurb:
        "Image-processing background; turns complex systems into clear user stories. Master’s, Tsinghua University.",
    },
    {
      name: "Vidusha Wijekoon",
      role: "R&D",
      blurb:
        "Software developer with a degree in Software Development, Sichuan University, and industry experience in AI and embedded systems.",
    },
    {
      name: "Chris de Dieu N. Likibi",
      role: "R&D",
      blurb:
        "Neural-network focus (CNN) and application delivery. Master’s, Zhejiang University of Science & Technology.",
    },
    {
      name: "Amisi Lumbu Espoir",
      role: "R&D",
      blurb:
        "Full-stack developer; ships testable prototypes fast. Zhejiang University of Technology.",
    },
  ],
};


// Optional: centralize the “Why” cards instead of hardcoding them in the section
const WHY = [
  { h: "Senior-only, no bench", p: "You work directly with people who design, code, and ship." },
  { h: "Cross-border ready", p: "China ↔ UAE delivery with bilingual docs and procurement-friendly process." },
  { h: "Governance built in", p: "Security, audit, and change history are part of the work, not an add-on." },
];

// Theme hook — respects system preference + manual toggle
function useTheme() {
  const prefersDark =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [theme, setTheme] = useState<"dark" | "light">(prefersDark ? "dark" : "light");

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
    root.classList.toggle("dark", theme === "dark");
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
<motion.div
  whileInView={{ y: 0, opacity: 1, boxShadow: "0 10px 28px rgba(0,0,0,.10)" }}
  initial={{ y: 8, opacity: 0 }}
  viewport={{ once: true, amount: 0.5 }}
  transition={{ duration: 0.35, ease: "easeOut" }}
>
<div
  className="ux-pill flex items-center gap-2 rounded-full border px-3 py-1 text-xs md:text-sm"
  style={{ borderColor: "var(--border)", background: "var(--card)" }}
>
  <Icon className="h-4 w-4" aria-hidden="true" />
  <span>{label}</span>
</div></motion.div>



);
export const projects = [
  {
    title: "NYL Shipping",
    desc: "Freight management portal for instant quotes, online bookings, and B/L tracking.",
    tags: ["Logistics", "Freight", "Web App"],
    caseStudy: { /* ...as you have... */ },
    demoImage: "nyl-hero.png",
    useCases: [
      { title: "Auto-doc parsing", desc: "Extract invoices/packing lists into fields." },
      { title: "HS-code helper", desc: "Suggest codes + confidence, human approves." },
      { title: "Milestones", desc: "ETA → Customs → Delivery alerts." },
    ],
  },
  {
    title: "Revit Automation Suite (100+ Plugins)",
    desc: "100+ custom Revit add-ins for hanger arrays, QA, param sync, BOM export, clash helpers, more.",
    tags: ["AEC", "Revit API", "C#/.NET"],
    caseStudy: { /* ... */ },
    demoImage: null, // image-only modal not needed
    useCases: [
      { title: "Auto hangers", desc: "Horizontal/vertical/angled from geometry." },
      { title: "Param sync", desc: "Round-trip DB ↔ family parameters." },
      { title: "BOM/QA", desc: "Schedules, clash prep, CSV/DB export." },
    ],
  },
  {
    title: "Intrusion Detection System",
    desc: "YOLOv5-based detection for restricted zones with edge inference.",
    tags: ["Computer Vision", "YOLOv5", "Surveillance"],
    caseStudy: { /* ... */ },
    demoImage: "ids-board.png",
    useCases: [
      { title: "Zones & schedules", desc: "Arm per area/time window." },
      { title: "On-device", desc: "Low-latency without cloud frames." },
      { title: "Privacy", desc: "Blur faces/bodies; keep audit trail." },
    ],
  },
  {
    title: "Capital AI — Financial Coach",
    desc: "LLM-powered coach for budgets and savings; offline-first option.",
    tags: ["Fintech", "AI", "LLM"],
    caseStudy: { /* ... */ },
    demoImage: "capital-ai.png",
    useCases: [
      { title: "Envelope budgets", desc: "Allocate income to goals." },
      { title: "Coach chat", desc: "Guard-railed guidance." },
      { title: "Imports", desc: "CSV/bank sync with auto-categorization." },
    ],
  },
  {
    title: "BasaAI HRM (Zimbabwe & Kenya)",
    desc: "Seasonal labor marketplace + basic HRM; offline-first for low connectivity.",
    tags: ["HRM", "React Native", "Vue", "Offline"],
    caseStudy: { /* ... */ },
    demoImage: null, // image-only modal not needed
    useCases: [
      { title: "Season hiring", desc: "Planting/harvest gigs, referral verification." },
      { title: "Low-data app", desc: "USSD/SMS fallback; compressed assets." },
      { title: "Attendance/pay", desc: "Daily logs, payouts, basic contracts." },
    ],
  },
];





function useLiveChartSeries(length = 56) {
  const [series, setSeries] = useState(
    Array.from({ length }, (_, i) => ({
      t: i,
      tokens: 800 + Math.round(130 * Math.sin(i / 3.4)) + Math.round(90 * Math.cos(i / 6.2)) + Math.round(Math.random() * 30),
      latency: 120 + Math.round(40 * Math.cos(i / 4.7)) + Math.round(15 * Math.sin(i / 2.3)) + Math.round(Math.random() * 10),
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
        setSeries((prev) => {
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
// --- Helpers: Shine button, Modal, UseCase popover ---

function FocusButton(
  {
    children,
    className = "",
    variant = "solid",
    style,
    ...rest // ← onMouseEnter, onFocus, onClick, aria-*, etc. all come through here
  }: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "solid" | "outline";
  }
) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const inView = useInView(ref, { amount: 0.7, margin: "0px 0px -10% 0px" });
  const [hover, setHover] = useState(false);
  const active = hover || inView;

  const baseSolid: React.CSSProperties = { background: C.highlight, color: "#fff" };
  const baseOutline: React.CSSProperties = { background: "transparent", color: "var(--text)" };

  return (
    <button
      ref={ref}
      data-active={active}
      className={`btn-attn rounded-xl inline-flex items-center gap-2 h-9 px-3 text-sm ${className}`}
      style={{ ...(variant === "solid" ? baseSolid : baseOutline), ...(style || {}) }}
      onMouseEnter={(e) => {
        setHover(true);
        rest.onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        setHover(false);
        rest.onMouseLeave?.(e);
      }}
      onFocus={(e) => {
        setHover(true);
        rest.onFocus?.(e);
      }}
      onBlur={(e) => {
        setHover(false);
        rest.onBlur?.(e);
      }}
      {...rest}
    >
      <span className="shine" aria-hidden />
      {children}
    </button>
  );
}



function ProjectCard({ p, i }: { p: typeof projects[number]; i: number }) {
  const [expanded, setExpanded] = useState<null | "case" | "demo">(null);

  const toggle = (key: "case" | "demo") =>
    setExpanded((cur) => (cur === key ? null : key));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.05 * i }}
      layout
    >
      <motion.div
        className="rounded-2xl border"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
        layout
      >
        <div
          className="p-6 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-between">
            <div className="text-xl font-semibold">{p.title}</div>
            <div className="flex gap-2">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full px-2 py-0.5 text-xs"
                  style={{
                    background: "var(--bg)",
                    border: `1px solid var(--border)`,
                    color: "var(--subtext)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <p
            className="mt-2 text-sm"
            style={{ color: "var(--subtext)" }}
          >
            {p.desc}
          </p>

          {/* BUTTONS → click to expand */}
          <div className="mt-4 flex gap-3">
            <FocusButton
              variant={expanded === "case" ? "solid" : "outline"}
              style={{ borderColor: "var(--border)" }}
              aria-expanded={expanded === "case"}
              aria-controls={`${p.title}-case`}
              onClick={() => toggle("case")}
            >
              <Code2 className="h-4 w-4" aria-hidden /> Case Study
            </FocusButton>

            <FocusButton
              variant={expanded === "demo" ? "solid" : "outline"}
              style={{ borderColor: "var(--border)" }}
              aria-expanded={expanded === "demo"}
              aria-controls={`${p.title}-demo`}
              onClick={() => toggle("demo")}
            >
              <Rocket className="h-4 w-4" aria-hidden /> Live Demo
            </FocusButton>
          </div>
        </div>

        {/* EXPANSION */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key={expanded}
              layout
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              aria-live="polite"
              className="overflow-hidden"
            >
              <div className="p-6">
                {expanded === "case" && (
                  <div id={`${p.title}-case`}>
                    {p.useCases?.length ? (
                      <div className="grid gap-3 sm:grid-cols-2">
                        {p.useCases.map((uc, idx) => (
                          <div
                            key={idx}
                            className="rounded-xl p-3"
                            style={{
                              background: "var(--card)",
                              border: `1px solid var(--border)`,
                            }}
                          >
                            <div className="text-sm font-medium">
                              {uc.title}
                            </div>
                            <div
                              className="mt-1 text-xs opacity-80"
                              style={{ color: "var(--subtext)" }}
                            >
                              {uc.desc}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm opacity-80">
                        Case study is being prepared.
                      </div>
                    )}
                  </div>
                )}

                {expanded === "demo" && (
                  <div id={`${p.title}-demo`}>
                    {p.demoImage ? (
                      <div className="grid gap-3 sm:grid-cols-[1fr,auto] items-start">
                        <img
                          src={p.demoImage}
                          alt={`${p.title} demo`}
                          className="rounded-xl border max-w-full"
                          style={{ borderColor: "var(--border)" }}
                        />
                        <p
                          className="text-xs opacity-80"
                          style={{ color: "var(--subtext)" }}
                        >
                          Click the button above to open demo.
                        </p>
                      </div>
                    ) : (
                      <div className="text-sm opacity-80">
                        Demo coming soon.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}


export default function HyperTechHome() {
  const data = useMemo(genData, []);
  const { theme } = useTheme();
  const live = useLiveChartSeries(56);
  const images = [
    { src: "/founderspace_award.png", alt: "Founders Space 1st Place Award" },
    { src: "/founder.png", alt: "Founder Presentation" },
  ];
  const financialImages = [
    { src: "/financialAI1.jpg", alt: "Financial AI Award – image 1" },
    { src: "/financialAI2.jpg", alt: "Financial AI Award – image 2" },
    { src: "/financialAI3.jpg", alt: "Financial AI Award – image 3" },
  ];
  
  const foundersImages = [
    { src: "/hyper1.jpg", alt: "Founders Space – image 1" },
    { src: "/hyper2.jpg", alt: "Founders Space – image 2" },
    { src: "/hyper3.jpg", alt: "Founders Space – image 3" },
  ];
  
  const [, setIndex] = useState(0);

// Add these two lines
const [financialIndex, setFinancialIndex] = useState(0);
const [foundersIndex, setFoundersIndex] = useState(0);


useEffect(() => {
  const foundersTimer = setInterval(
    () => setFoundersIndex((i) => (i + 1) % foundersImages.length),
    5000
  );
  return () => clearInterval(foundersTimer);
}, [foundersImages.length]);

// Independent auto-cycle for both sliders
// Remove the two separate timers
// and replace them with a single shared interval controlling both:

useEffect(() => {
  const interval = setInterval(() => {
    setFinancialIndex((prev) => (prev + 1) % financialImages.length);
    setFoundersIndex((prev) => (prev + 1) % foundersImages.length);
  }, 4000); // both advance at the same moment
  return () => clearInterval(interval);
}, [financialImages.length, foundersImages.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Cyberpunk dissolve variants — glitchy scan & fade

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden" style={{ background: "var(--bg)", color: "var(--text)" }}>
      {/* Subtle brand auras */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-20 top-[-10%] h-72 w-72 rounded-full blur-[100px]" style={{ background: `${C.primary}33` }} />
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full blur-[100px]" style={{ background: `${C.accent}33` }} />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full blur-[100px]" style={{ background: `${C.highlight}24` }} />
      </div>

      {/* HERO */}
      <section className="relative mx-auto max-w-7xl px-4 pb-16 pt-6 md:pt-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[-1] h-32" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.06), rgba(0,0,0,0) 60%)" }} />
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
              We build{" "}
              <span className="brand-gradient glitch" data-text="Simple-first">
                Simple-first
              </span>{" "}
              platforms for the next decade.
            </motion.h1>

            <p className="mt-4 max-w-xl md:text-lg" style={{ color: "var(--subtext)" }}>
              {BRAND.heroSub}
            </p>

            <div className="mt-4 grid max-w-xl gap-2 text-sm" style={{ color: "var(--subtext)" }}>
              {BRAND.trustBullets.map((b) => (
                <div key={b} className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" /> {b}
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Pill icon={Bot} label="LLM Apps" />
              <Pill icon={Database} label="Data Engineering" />
              <Pill icon={ShieldCheck} label="Cyber & Governance" />
              <Pill icon={ChartBar} label="Analytics" />
              <Pill icon={Globe2} label="WebGL/Maps" />
            </div>
            <style>{`
              /* ===== Universal hover shine/lift for cards, pills, team ===== */
              .ux-card {
                position: relative;
                border: 1px solid var(--border);
                background: var(--card);
                border-radius: 1rem; /* ~rounded-2xl */
                transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease, background .18s ease;
                will-change: transform, box-shadow;
              }
              /* subtle gradient ring on hover using a masked ::before */
              .ux-card::before {
                content: "";
                position: absolute; inset: -1px; border-radius: inherit;
                background: conic-gradient(from 180deg, ${C.accent}, ${C.primary}, ${C.highlight}, ${C.accent});
                opacity: 0; filter: blur(8px);
                transition: opacity .18s ease, filter .18s ease;
                -webkit-mask: 
                  linear-gradient(#000 0 0) content-box, 
                  linear-gradient(#000 0 0);
                -webkit-mask-composite: xor; mask-composite: exclude;
                padding: 1px;
                pointer-events: none;
              }
              .ux-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 14px 34px rgba(0,0,0,.12);
                border-color: color-mix(in oklab, var(--accent) 45%, var(--border));
              }
              .ux-card:hover::before { opacity: .7; filter: blur(10px); }

              /* icon bump + tint inside cards on hover */
              .ux-card .ux-icon-wrap {
                transition: transform .18s ease, background-color .18s ease, color .18s ease;
              }
              .ux-card:hover .ux-icon-wrap {
                transform: translateY(-1px);
                background: color-mix(in oklab, ${C.accent} 28%, transparent);
                color: ${C.accent};
              }

              /* ===== Pills (LLM Apps / Data Eng / etc.) ===== */
              .ux-pill {
                transition: transform .16s ease, box-shadow .16s ease, border-color .16s ease;
              }
              .ux-pill:hover {
                transform: translateY(-1px);
                border-color: color-mix(in oklab, var(--accent) 45%, var(--border));
                box-shadow: 0 8px 22px rgba(0,0,0,.10);
              }

              /* ===== Team cards: soft spotlight + avatar tilt ===== */
              .team-card { overflow: hidden; }
              .team-card::after {
                content: "";
                position: absolute; inset: 0;
                background: radial-gradient(120px 120px at var(--mx, 60%) var(--my, 40%), rgba(255,255,255,.08), transparent 60%);
                opacity: 0; transition: opacity .18s ease;
                pointer-events: none;
              }
              .team-card:hover::after { opacity: 1; }
              .team-avatar {
                transition: transform .22s ease, box-shadow .22s ease;
                will-change: transform;
              }
              .team-card:hover .team-avatar {
                transform: rotate(-1.5deg) scale(1.03);
                box-shadow: 0 10px 28px rgba(0,0,0,.18);
              }

              /* Mouse position CSS vars for spotlight (no JS required fallback; optional JS below) */
              .team-card { --mx: 60%; --my: 40%; }

              /* Respect reduced motion */
              @media (prefers-reduced-motion: reduce) {
                .ux-card, .ux-pill, .team-avatar { transition: none !important; }
                .ux-card:hover, .ux-pill:hover { transform: none !important; box-shadow: none !important; }
                .ux-card::before, .team-card::after { display: none !important; }
              }
            `}</style>

            <style>{`
            .btn-attn {
              position: relative;
              overflow: hidden;
              transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
              border: 1px solid var(--border);
              will-change: transform, box-shadow;
            }
            .btn-attn[data-active="true"] {
              transform: translateY(-1px);
              box-shadow: 0 10px 26px rgba(40,147,182,0.25), 0 2px 8px rgba(0,0,0,0.06);
              border-color: color-mix(in oklab, var(--accent) 50%, var(--border));
            }
            .btn-attn .shine {
              pointer-events: none;
              position: absolute;
              inset: -1px;
              border-radius: inherit;
              opacity: 0;
              background:
                linear-gradient(120deg,
                  transparent 5%,
                  rgba(255,255,255,.35) 12%,
                  transparent 20%) no-repeat 0% 0% / 200% 100%;
              mask: linear-gradient(black, black) exclude;
            }
            .btn-attn[data-active="true"] .shine {
              opacity: 1;
              animation: sweep 2.2s linear infinite;
            }
            @keyframes sweep {
              0%   { background-position: -100% 0; }
              100% { background-position: 200% 0;  }
            }

            /* Optional: stronger “activated” hover */
            .btn-attn:hover {
              transform: translateY(-2px);
              box-shadow: 0 14px 34px rgba(235,97,1,0.28), 0 3px 10px rgba(0,0,0,0.08);
              border-color: ${C.highlight};
            }
          `}</style>

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
                pointer-events:none;
                mix-blend-mode: normal;
              }
              .glitch::before{ text-shadow: 1px 0 var(--brand-accent); animation: gl1 2.1s infinite linear; }
              .glitch::after{ text-shadow: -1px 0 var(--brand-highlight); animation: gl2 2.1s infinite linear; }
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
              <div className="mt-8 flex gap-3">
              <FocusButton
                variant="solid"
                style={{ boxShadow: "0 8px 24px rgba(235,97,1,0.35)" }}
                data-cta="email"
              >
                <Sparkles className="h-4 w-4" aria-hidden /> Start a Project
              </FocusButton>

              <FocusButton
                variant="outline"
                style={{ borderColor: "var(--border)" }}
                data-cta="email"
              >
                <Rocket className="h-4 w-4" aria-hidden /> Our Work
              </FocusButton>
            </div>
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
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} className="relative">
            <div className="relative rounded-2xl p-6 shadow-2xl" style={{ background: `linear-gradient(180deg, var(--card), transparent)`, border: `1px solid var(--border)` }}>
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
            <motion.div className="absolute -right-4 -top-4 rounded-xl px-3 py-1 text-xs backdrop-blur" style={{ border: `1px solid ${C.accent}4d`, background: `${C.accent}1a` }} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
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
            { icon: Bot, title: "AI Products", desc: "LLM apps, RAG, fine-tuning, evals, safety, and prompt tooling.", badge: "Copilots" },
            { icon: Database, title: "Data Platforms", desc: "Ingestion → Lakehouse → Feature store → ML Ops with governance.", badge: "Data Mesh" },
            { icon: ShieldCheck, title: "Cyber & Compliance", desc: "Dashboards, risk registers, IAM, and audit-ready workflows.", badge: "Zero-Trust" },
          ].map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 * i }}>
            <div className="ux-card h-full">
              <div className="flex items-center gap-3 p-6 border-b" style={{ borderColor: "var(--border)" }}>
                <div className="ux-icon-wrap rounded-xl p-2" style={{ background: `${C.primary}22` }}>
                  <s.icon className="h-5 w-5" aria-hidden />
                </div>
                <div className="text-lg font-semibold">{s.title}</div>
                <span className="ml-auto rounded-full px-2 py-0.5 text-xs" style={{ background: `${C.accent}2b`, color: C.accent }}>
                  {s.badge}
                </span>
              </div>
              <div className="p-6 text-sm" style={{ color: "var(--subtext)" }}>{s.desc}</div>
            </div>

            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY HYPER-TECH */}
      <section id="why" className="mx-auto max-w-7xl px-4 py-12 md:py-20">
        <div className="mb-8 flex items-center gap-2">
          <div className="h-6 w-1 rounded" style={{ background: C.primary }} />
          <h2 className="text-2xl font-semibold md:text-3xl">Why Hyper-Tech</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {WHY.map((it) => (
            <div key={it.h} className="ux-card p-4">
              <div className="font-semibold">{it.h}</div>
              <div className="mt-1 text-sm" style={{ color: "var(--subtext)" }}>{it.p}</div>
            </div>

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
            <ProjectCard key={p.title} p={p} i={i} />
          ))}
        </div>

      </section>

      {/* PRINCIPLES (new) */}
      <section id="principles" className="mx-auto max-w-7xl px-4 py-12 md:py-20">
        <div className="mb-8 flex items-center gap-2">
          <div className="h-6 w-1 rounded" style={{ background: C.accent }} />
          <h2 className="text-2xl font-semibold md:text-3xl">Principles</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {BRAND.principles.map(([h, p]) => (
            <div key={h} className="ux-card p-4">
              <div className="font-semibold">{h}</div>
              <div className="mt-1 text-sm" style={{ color: "var(--subtext)" }}>{p}</div>
            </div>

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
              <div className="h-40 w-full rounded-lg" style={{ background: `${C.accent}22`, border: `1px solid var(--border)` }} />
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
              <div className="h-40 w-full rounded-lg" style={{ background: `${C.highlight}22`, border: `1px solid var(--border)` }} />
              <p className="mt-3 text-sm" style={{ color: "var(--subtext)" }}>
                Qualitative + quantitative risk scoring with audit history.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ABOUT / STORY + TEAM */}
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
            <div className="ux-card p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="ux-icon-wrap rounded-xl p-2" style={{ background: `${C.accent}22` }}>
                  <b.icon className="h-5 w-5" aria-hidden />
                </div>
                <div className="font-semibold">{b.label}</div>
              </div>
              <div className="text-sm" style={{ color: "var(--subtext)" }}>{b.items}</div>
            </div>

            </motion.div>
          ))}
        </div>

        {/* Story line */}
        <div className="mt-10 grid gap-3 md:grid-cols-4">
          {BRAND.story?.length > 0 && (
          BRAND.story.map((s) => (
            <div
              key={s.y}
              className="rounded-2xl p-4"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            >
              <div className="text-sm font-semibold" style={{ color: C.accent }}>
                {s.y}
              </div>
              <div className="mt-1 text-sm" style={{ color: "var(--subtext)" }}>
                {s.t}
              </div>
            </div>
          ))
        )}

        </div>

        {/* Team */}
        <div className="mt-12">
          <div className="mb-6 flex items-center gap-2">
            <div className="h-6 w-1 rounded" style={{ background: C.primary }} />
            <h3 className="text-xl font-semibold">Team</h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {BRAND.team.map((m) => (
             <div
             key={m.name}
             className="team-card ux-card flex gap-4 items-start p-4"
             onMouseMove={(e) => {
               const t = e.currentTarget.getBoundingClientRect();
               e.currentTarget.style.setProperty('--mx', ((e.clientX - t.left) / t.width) * 100 + '%');
               e.currentTarget.style.setProperty('--my', ((e.clientY - t.top) / t.height) * 100 + '%');
             }}
           >
             <img
               src={`/${m.name.toLowerCase().replace(/ /g, "_")
               }.png`}
               alt={m.name}
               className="team-avatar h-20 w-20 rounded-full object-cover border"
               style={{ borderColor: "var(--border)" }}
             />
             <div>
               <div className="font-semibold">{m.name}</div>
               <div className="text-sm opacity-80">{m.role}</div>
               <p className="mt-2 text-sm" style={{ color: "var(--subtext)" }}>{m.blurb}</p>
             </div>
           </div>
           
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-2xl p-6" style={{ background: `linear-gradient(90deg, ${C.primary}14, ${C.accent}14)`, border: `1px solid var(--border)` }}>
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h3 className="text-xl font-semibold">Have a challenge in data or AI?</h3>
              <p style={{ color: "var(--subtext)" }}>We can scope a 1-week discovery sprint and deliver a clickable prototype.</p>
            </div>
            <Button
              className="rounded-xl"
              style={{ background: C.highlight, color: "#fff" }}
              data-cta="email"
            >
              <Sparkles className="mr-2 h-4 w-4" aria-hidden /> Book discovery
            </Button>
          </div>
        </div>
      </section>

      <section id="history" className="mx-auto max-w-7xl px-4 py-12 md:py-20">
  {/* Section Header */}
  <div className="mb-8 flex items-center gap-2">
    <div className="h-6 w-1 rounded" style={{ background: C.primary }} />
    <h2 className="text-2xl font-semibold md:text-3xl">Our Journey</h2>
  </div>

  {/* 2020 */}
  <div className="grid gap-8 md:grid-cols-2">
    <div>
      <h3 className="font-semibold mb-2">2020 — The First Office</h3>
      <p className="text-sm" style={{ color: "var(--subtext)" }}>
        We started from a two-desk room in Hangzhou. The goal was simple: build something real with no funding,
        just code and persistence. From that small room, Hyper-Tech was born.
      </p>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <img src="/office1.png" alt="First office" className="rounded-lg object-cover" />
        <img src="/office2.png" alt="Early work setup" className="rounded-lg object-cover" />
      </div>
    </div>

    <div>
      <h3 className="font-semibold mb-2">2021–2023 — Growth & Team</h3>
      <p className="text-sm" style={{ color: "var(--subtext)" }}>
        We grew from two people into a distributed R&D team across China, Sri Lanka, Africa, and Europe —
        shipping AI, data, and computer-vision solutions for enterprises and startups alike.
      </p>
      <div className="mt-3 grid grid-cols-3 gap-3">
        <img src="/team1.png" alt="Team meeting" className="rounded-lg object-cover" />
        <img src="/team2.png" alt="Workshop" className="rounded-lg object-cover" />
        <img src="/team3.png" alt="Hack session" className="rounded-lg object-cover" />
      </div>
    </div>
  </div>

  {/* === 2023 – Financial AI App Award === */}
  <div className="mt-20 grid md:grid-cols-[40%_1fr] gap-8 items-start">
    {/* Left: slider */}
    <div
      className="relative aspect-[4/3] overflow-hidden rounded-xl border-2"
      style={{
        borderColor: `${C.primary}40`,
        boxShadow: `0 0 15px ${C.primary}22`,
        background: `linear-gradient(145deg, ${C.primary}10, ${C.accent}08)`,
        maxWidth: "420px",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={financialIndex}
          src={financialImages[financialIndex].src}
          alt={financialImages[financialIndex].alt}
          className="absolute inset-0 w-full h-full object-cover rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </AnimatePresence>

    </div>

    {/* Right: description + thumbs */}
    <div>
      <h3 className="font-semibold mb-2" style={{ color: C.primary }}>
        🏅 2023 — Financial AI App Award
      </h3>
      <p className="text-sm mb-4" style={{ color: "var(--subtext)" }}>
        Our <strong style={{ color: C.highlight }}>“Capital AI — Financial Coach”</strong> app was recognized for innovation in
        <strong style={{ color: C.accent }}> AI-driven financial applications</strong>.  
        Built with large language models, it enables users and founders to manage budgets, analyze costs,
        and plan investments through intelligent, conversational insights.
      </p>
      <div className="flex gap-3">
        {financialImages.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt={img.alt}
            onClick={() => setFinancialIndex(i)}
            className={`h-16 w-24 rounded-md border object-cover cursor-pointer transition-all duration-300 ${
              i === financialIndex ? "ring-2 ring-[var(--highlight)] scale-105" : "opacity-80 hover:opacity-100"
            }`}
            style={{ borderColor: "var(--border)" }}
          />
        ))}
      </div>

      {/* Caption below the main image */}
      <p className="text-xs text-gray-400 mt-3 italic">
        {financialIndex === 0 && "With Mario Salazar C. — ZTVP Affiliate & Edtech Entrepreneur (Zhejiang University)"}
        {financialIndex === 1 && "Award Certificate – MyFinancial-AI project shortlisted for the Most Investable Prize"}
        {financialIndex === 2 && "Finalists of the Entrepreneurship Competition – Shahrukh Amir & Mario Salazar C."}
      </p>
    </div>
  </div>

{/* === 2024 – Founders Space 1st Place === */}
<div className="mt-24">
  <h3 className="font-semibold mb-3 text-cyan-400 text-center md:text-left">
    🏆 2024 — Founders Space 1st Place
  </h3>
  <p className="text-sm text-gray-400 max-w-2xl md:mb-6 mb-4 md:text-left text-center mx-auto md:mx-0">
    Hyper-Tech’s <strong className="text-orange-400">“Shop-N-Go” AI retail solution</strong> won
    <strong className="text-cyan-300"> 1st Place </strong>at the Founders Space Captains Acceleration Camp — 
    celebrating practical AI engineering and global collaboration. 
    Founders Space, based in San Francisco, is led by CEO <strong>Steve Hoffman (Captain Hoff)</strong>, 
    a leading voice in global startup innovation.
  </p>

  <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-6 items-start">
    {/* Left: photo mosaic */}
    <div className="grid grid-cols-3 gap-3">
      <img
        src="/hyper1.jpg"
        alt="Hyper-Tech team receiving 1st Place award"
        className="rounded-xl border object-cover"
        style={{ borderColor: "var(--border)" }}
      />
      <img
        src="/hyper2.jpg"
        alt="Founder with Steve Hoffman (Captain Hoff), CEO of Founders Space"
        className="rounded-xl border object-cover"
        style={{ borderColor: "var(--border)" }}
      />
      <img
        src="/hyper3.jpg"
        alt="Team holding the Founders Space certificate"
        className="rounded-xl border object-cover"
        style={{ borderColor: "var(--border)" }}
      />
    </div>

    {/* Right: glowing slider */}
    <div className="flex flex-col items-center w-full">
      <div
        className="relative aspect-[4/3] overflow-hidden rounded-2xl border-2 
                   border-cyan-500/40 shadow-[0_0_20px_rgba(0,255,255,0.25)] 
                   bg-gradient-to-br from-[#0a0f1c] to-[#05080f] max-w-sm w-full mx-auto"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={foundersIndex}
            src={foundersImages[foundersIndex].src}
            alt={foundersImages[foundersIndex].alt}
            className="absolute inset-0 w-full h-full object-cover rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </AnimatePresence>


        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full 
            bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px)] 
            bg-[length:100%_3px]" />
        </div>
      </div>

      {/* Persistent caption below slider */}
      <div className="mt-2 text-xs text-gray-400 italic text-center mx-auto w-full max-w-sm transition-opacity duration-500">
        {foundersIndex === 0 && "1st Place Award Ceremony – Hyper-Tech Team"}
        {foundersIndex === 1 && "Founder with Steve Hoffman (Captain Hoff), CEO of Founders Space"}
        {foundersIndex === 2 && "Team celebrating the award with certificate in hand"}
      </div>
    </div>
  </div>
</div>

</section>


      {/* FOOTER */}
      <footer className="py-12" style={{ borderTop: `1px solid var(--border)` }}>
        <div className="mx-auto max-w-7xl px-4">
          {/* Top row */}
          <div className="grid gap-10 md:grid-cols-4">
            {/* Brand / blurb */}
            <div className="space-y-4">
              <a href="/" className="inline-flex items-center gap-2" aria-label="Hyper-Tech Home">
                <img
                  src={theme === "dark" ? "/logodark.png" : "/logowhite.png"}
                  alt="Hyper-Tech logo"
                  className="h-10 w-auto md:h-14"
                />
              </a>
              <p className="text-sm leading-relaxed" style={{ color: "var(--subtext)" }}>
                We build reliable AI, data, and cyber products for teams that value
                speed and security.
              </p>

              {/* Badges stay for brand cues */}
              <div className="flex flex-wrap gap-2">
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

            {/* Quick links */}
            <div>
              <div className="mb-3 font-semibold">Company</div>
              <ul className="space-y-2 text-sm">
                <li><a className="opacity-85 hover:opacity-100" href="#services">Services</a></li>
                <li><a className="opacity-85 hover:opacity-100" href="#projects">Projects</a></li>
                <li><a className="opacity-85 hover:opacity-100" href="#visuals">Visuals</a></li>
                <li><a className="opacity-85 hover:opacity-100" href="#about">About</a></li>
                <li><a className="opacity-85 hover:opacity-100" href="/docs">Docs</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <div className="mb-3 font-semibold">Contact</div>
              <div className="space-y-2 text-sm" style={{ color: "var(--subtext)" }}>
                <div className="flex items-start gap-2">
                  <svg className="h-4 w-4 mt-0.5 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 4h16v16H4z" opacity=".0"/><path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>Hangzhou International Talents Entrepreneurship & Innovation Park, Room 1012, 10th Floor, Building 1, No. 171, Xiangyuan Road</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 4h16v16H4z" opacity=".0"/><path d="M4 4l8 8 8-8"/><path d="M22 6v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6"/></svg>
                  <a className="hover:opacity-100 opacity-85" href="mailto:hello@hyper-tech.dev">hello@hyper-tech.dev</a>
                </div>
              </div>

              {/* Socials */}
              <div className="mt-3 flex items-center gap-3">
                <a aria-label="GitHub" className="opacity-80 hover:opacity-100" href="https://github.com/hyper-tech" target="_blank" rel="noreferrer">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5A12 12 0 0 0 0 12.7c0 5.4 3.4 10 8.2 11.6.6.1.8-.3.8-.6v-2.1c-3.3.8-4-1.6-4-1.6-.6-1.5-1.4-1.9-1.4-1.9-1.1-.7.1-.7.1-.7 1.3.1 2 .  1.4 2 .  1.4 1.1 2 2.9 1.4 3.6 1.1.1-.8.4-1.4.7-1.7-2.6-.3-5.3-1.3-5.3-5.9 0-1.3.5-2.4 1.2-3.3-.1-.3-.5-1.6.1-3.4 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.8.2 3.1.1 3.4.8.9 1.2 2 1.2 3.3 0 4.6-2.7 5.6-5.3 5.9.4.3.8 1 .8 2.1v3.1c0 .3.2.7.8.6 4.8-1.6 8.2-6.2 8.2-11.6A12 12 0 0 0 12 .5"/></svg>
                </a>
                <a aria-label="LinkedIn" className="opacity-80 hover:opacity-100" href="https://www.linkedin.com/company/hyper-tech" target="_blank" rel="noreferrer">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0zM8 8h4.8v2.2h.1c.7-1.3 2.3-2.7 4.7-2.7 5 0 5.9 3.3 5.9 7.6V24h-5v-7.2c0-1.7 0-3.9-2.4-3.9-2.4 0-2.7 1.9-2.7 3.8V24H8z"/></svg>
                </a>
                {/* WeChat (optional QR) */}
                <a aria-label="WeChat QR" className="opacity-80 hover:opacity-100" href="/images/wechat_qr.png" target="_blank" rel="noreferrer">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h6v6H3zM9 9h6v6H9zM15 3h6v6h-6zM3 15h6v6H3zM15 15h6v6h-6z"/></svg>
                </a>
              </div>
            </div>

            {/* Newsletter / CTA */}
            <div>
              <div className="mb-3 font-semibold">Stay in the loop</div>
              <p className="text-sm mb-3" style={{ color: "var(--subtext)" }}>
                Monthly notes on AI products and engineering.
              </p>
              <form
                className="flex items-center gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  // handle submit
                }}
              >
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  className="h-9 w-full rounded-md border px-3 text-sm"
                  style={{ background: "var(--card)", color: "var(--text)", borderColor: "var(--border)" }}
                />
                <Button className="h-9 rounded-xl" style={{ background: C.highlight, color: "#fff" }}>
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          {/* Divider */}
          <div className="my-8 h-px" style={{ background: "var(--border)" }} />

          {/* Bottom row / legal */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between text-xs" style={{ color: "var(--subtext)" }}>
            <div>
              © {new Date().getFullYear()} Hyper-Tech • Hangzhou Hyperchip Software Technology Co., Ltd.
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <span>杭州海启软件科技有限公司</span>
              <span>浙江省杭州国际人才创业创新园祥园路171号1幢10楼1012室</span>
              {/* Replace with your ICP/备案号 if applicable */}
              <a className="opacity-85 hover:opacity-100" href="/privacy">Privacy</a>
              <a className="opacity-85 hover:opacity-100" href="/terms">Terms</a>
              <a className="opacity-85 hover:opacity-100" href="/security">Security</a>
              <a className="opacity-85 hover:opacity-100" href="/dpa">DPA</a>
              <a className="opacity-85 hover:opacity-100" href="/status">Status</a>
            </div>
          </div>

          {/* Tiny line for tone */}
          <div className="mt-2 text-[11px]" style={{ color: "var(--subtext)" }}>
            Built in Hangzhou & remote — transparent, practical, and partner-friendly.
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
