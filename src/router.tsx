import { createBrowserRouter } from "react-router-dom";
import SiteLayout from "@/layouts/SiteLayout";
import HyperTechHome from "@/HyperTechHome";

// ✅ Define a proper React component with props
type PProps = {
  name: string;
};

const P: React.FC<PProps> = ({ name }) => (
  <div className="mx-auto max-w-5xl px-4 py-14">
    <h1 className="text-3xl font-bold mb-4">{name}</h1>
    <p style={{ color: "var(--subtext)" }}>
      This is a placeholder. Replace with real content.
    </p>
  </div>
);

// ✅ Router configuration
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
