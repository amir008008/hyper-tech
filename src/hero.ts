type StoryItem = { y: string; t: string };

export const HERO: {
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
        "Engineer and Data Scientist with experienced with text, 2D and 3D image processing. Turns vague ideas into clear user stories. French-Chinese double Master’s Degree in two top universities : Centrale Méditerranée and Tsinghua University",
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
