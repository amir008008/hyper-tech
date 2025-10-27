import { useMemo } from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// --- Demo dataset for visualization ---
const genData = () =>
  Array.from({ length: 24 }).map((_, i) => ({
    t: `${i}:00`,
    tokens: Math.round(800 + 400 * Math.sin(i / 2) + Math.random() * 120),
    latency: Math.round(120 + 60 * Math.cos(i / 3) + Math.random() * 40),
  }));

const Pill = ({ icon: Icon, label }: { icon: any; label: string }) => (
  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs md:text-sm">
    <Icon className="h-4 w-4" />
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
    desc: "Internal platform to orchestrate data pipelines and embeddings.",
    tags: ["Data", "Embeddings", "Pipelines"],
  },
];

export default function HyperTechHome() {
  const data = useMemo(genData, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#07090f] text-white">
      {/* Glow background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-20 top-[-10%] h-72 w-72 rounded-full bg-cyan-500/20 blur-[90px]" />
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-[90px]" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-indigo-500/20 blur-[90px]" />
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-black/30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-400 to-fuchsia-500" />
            <span className="font-semibold tracking-wide">HYPER‑TECH</span>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            <a href="#services" className="text-sm text-white/70 hover:text-white">Services</a>
            <a href="#projects" className="text-sm text-white/70 hover:text-white">Projects</a>
            <a href="#visuals" className="text-sm text-white/70 hover:text-white">Visuals</a>
            <a href="#about" className="text-sm text-white/70 hover:text-white">About</a>
          </nav>
          <div className="flex items-center gap-3">
            <Input placeholder="Your email" className="hidden h-9 w-40 bg-white/5 text-white placeholder:text-white/40 md:block" />
            <Button className="h-9 rounded-xl bg-white/10 hover:bg-white/20">
              Contact
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative mx-auto mt-6 max-w-7xl px-4 py-12 md:py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold leading-tight md:text-6xl"
            >
              We build <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-fuchsia-400 bg-clip-text text-transparent">AI‑first</span> platforms for the next decade.
            </motion.h1>
            <p className="mt-4 max-w-xl text-white/70 md:text-lg">
              Hyper‑Tech is a collective of senior engineers, PMs, and designers delivering high‑impact software: data platforms, cyber dashboards, and AI copilots.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Pill icon={Bot} label="LLM Apps" />
              <Pill icon={Database} label="Data Engineering" />
              <Pill icon={ShieldCheck} label="Cyber & Governance" />
              <Pill icon={ChartBar} label="Analytics" />
              <Pill icon={Globe2} label="WebGL/Maps" />
            </div>
            <div className="mt-8 flex gap-3">
              <Button className="rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white hover:opacity-90">
                Start a Project
              </Button>
              <Button variant="outline" className="rounded-xl border-white/20 bg-white/0 text-white hover:bg-white/10">
                Our Work
              </Button>
            </div>
            <div className="mt-10 flex items-center gap-6 text-white/60">
              <div className="flex items-center gap-2"><Zap className="h-4 w-4"/> <span>Fast iterations</span></div>
              <div className="flex items-center gap-2"><GitBranch className="h-4 w-4"/> <span>GitHub native</span></div>
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4"/> <span>Security by design</span></div>
            </div>
          </div>

          {/* Right: Animated panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 shadow-2xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                  <Cpu className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm text-white/60">Demo: Inference Telemetry</div>
                  <div className="text-lg font-semibold">Tokens vs. Latency</div>
                </div>
              </div>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.5}/>
                        <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#e879f9" stopOpacity={0.5}/>
                        <stop offset="95%" stopColor="#e879f9" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="t" hide />
                    <YAxis hide />
                    <Tooltip contentStyle={{ background: "#0b0e16", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} labelStyle={{ color: "#9ca3af" }} />
                    <Area type="monotone" dataKey="tokens" stroke="#22d3ee" fillOpacity={1} fill="url(#g1)" strokeWidth={2} />
                    <Area type="monotone" dataKey="latency" stroke="#e879f9" fillOpacity={1} fill="url(#g2)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-white/70">
                <div className="rounded-lg border border-white/10 bg-white/5 p-2">Throughput ↑</div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-2">P95 Latency ↓</div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-2">Cost / 1k tok</div>
              </div>
            </div>
            <motion.div
              className="absolute -right-4 -top-4 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs backdrop-blur"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5"/>Generative‑Ready</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-7xl px-4 py-12 md:py-20">
        <div className="mb-8 flex items-center gap-2">
          <div className="h-6 w-1 rounded bg-cyan-400"/>
          <h2 className="text-2xl font-semibold md:text-3xl">What we do</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Bot,
              title: "AI Products",
              desc: "LLM apps, RAG, fine‑tuning, evals, safety, and prompt tooling.",
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
              desc: "Dashboards, risk registers, IAM, and audit‑ready workflows.",
              badge: "Zero‑Trust",
            },
          ].map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * i }}
            >
              <Card className="h-full border-white/10 bg-white/5">
                <CardHeader className="flex items-center gap-3">
                  <div className="rounded-xl bg-white/10 p-2">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">{s.title}</CardTitle>
                  <Badge className="ml-auto rounded-full bg-cyan-500/20 text-cyan-300">
                    {s.badge}
                  </Badge>
                </CardHeader>
                <CardContent className="text-sm text-white/70">{s.desc}</CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="mx-auto max-w-7xl px-4 py-12 md:py-20">
        <div className="mb-8 flex items-center gap-2">
          <div className="h-6 w-1 rounded bg-fuchsia-400"/>
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
              <Card className="group h-full border-white/10 bg-white/5">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{p.title}</CardTitle>
                    <div className="flex gap-2">
                      {p.tags.map((t) => (
                        <Badge key={t} className="rounded-full bg-white/10 text-white/80">{t}</Badge>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70">{p.desc}</p>
                  <div className="mt-4 flex gap-3">
                    <Button size="sm" className="rounded-xl bg-white/10 hover:bg-white/20"><Code2 className="mr-2 h-4 w-4"/>Case Study</Button>
                    <Button size="sm" variant="outline" className="rounded-xl border-white/20 bg-white/0 text-white hover:bg-white/10"><Rocket className="mr-2 h-4 w-4"/>Live Demo</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Visuals / Big Data */}
      <section id="visuals" className="mx-auto max-w-7xl px-4 py-12 md:py-20">
        <div className="mb-8 flex items-center gap-2">
          <div className="h-6 w-1 rounded bg-indigo-400"/>
          <h2 className="text-2xl font-semibold md:text-3xl">Interactive Visuals</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg"><ChartBar className="h-5 w-5"/> Model Telemetry</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="g3" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.5}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="t" hide />
                    <YAxis hide />
                    <Tooltip contentStyle={{ background: "#0b0e16", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} labelStyle={{ color: "#9ca3af" }} />
                    <Area type="monotone" dataKey="tokens" stroke="#8b5cf6" fillOpacity={1} fill="url(#g3)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-3 text-sm text-white/70">Track throughput, cost, and quality with built‑in evals dashboards.</p>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg"><Globe2 className="h-5 w-5"/> Ops Console</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-40 w-full rounded-lg border border-white/10 bg-gradient-to-br from-white/10 to-white/0" />
              <p className="mt-3 text-sm text-white/70">Geo‑routed incidents and SLA‑aware workflows across regions.</p>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg"><ShieldCheck className="h-5 w-5"/> Risk Register</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-40 w-full rounded-lg border border-white/10 bg-gradient-to-br from-white/10 to-white/0" />
              <p className="mt-3 text-sm text-white/70">Qualitative + quantitative risk scoring with audit history.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* About / Stack */}
      <section id="about" className="mx-auto max-w-7xl px-4 py-12 md:py-20">
        <div className="mb-8 flex items-center gap-2">
          <div className="h-6 w-1 rounded bg-teal-400"/>
          <h2 className="text-2xl font-semibold md:text-3xl">Our Stack</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-4">
          {[{
            icon: Bot, label: "LLMs", items: "OpenAI, vLLM, RAG, Evals"
          },{
            icon: Database, label: "Data", items: "ClickHouse, DuckDB, Spark, Iceberg"
          },{
            icon: Code2, label: "Frontend", items: "React, Next.js, Tailwind, WebGL"
          },{
            icon: ShieldCheck, label: "Security", items: "SSO, RBAC, Vault, Audit"
          }].map((b, i) => (
            <motion.div key={b.label} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <div className="rounded-xl bg-white/10 p-2"><b.icon className="h-5 w-5"/></div>
                  <div className="font-semibold">{b.label}</div>
                </div>
                <div className="text-sm text-white/70">{b.items}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-gradient-to-r from-white/5 to-white/0 p-6">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h3 className="text-xl font-semibold">Have a challenge in data or AI?</h3>
              <p className="text-white/70">We can scope a 1‑week discovery sprint and deliver a clickable prototype.</p>
            </div>
            <Button className="rounded-xl bg-white/10 hover:bg-white/20"><Sparkles className="mr-2 h-4 w-4"/>Book discovery</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-cyan-400 to-fuchsia-500" />
                <span className="font-semibold tracking-wide">HYPER‑TECH</span>
              </div>
              <p className="mt-2 text-sm text-white/60">China‑registered | Global remote collective</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="rounded-full bg-white/10">AI‑focused</Badge>
              <Badge className="rounded-full bg-white/10">Cyber‑ready</Badge>
              <Badge className="rounded-full bg-white/10">Data‑driven</Badge>
            </div>
          </div>
          <div className="mt-6 text-xs text-white/50">© {new Date().getFullYear()} Hyper‑Tech. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
