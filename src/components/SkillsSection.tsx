import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

const getBrandColor = (name: string) => {
  const normalized = name.toLowerCase().trim();
  switch (normalized) {
    case "html": return "rgba(227, 79, 38, 0.25)";
    case "css": return "rgba(21, 114, 182, 0.25)";
    case "javascript": return "rgba(247, 223, 30, 0.25)";
    case "reactjs":
    case "react": return "rgba(97, 218, 251, 0.25)";
    case "express": return "rgba(255, 255, 255, 0.15)";
    case "node.js":
    case "nodejs": return "rgba(51, 153, 51, 0.25)";
    case "jquery": return "rgba(7, 105, 173, 0.25)";
    case "tailwind css":
    case "tailwindcss": return "rgba(6, 182, 212, 0.25)";
    case "bootstrap": return "rgba(121, 82, 179, 0.25)";
    case "motion.dev": return "rgba(244, 63, 94, 0.25)";
    case "mongodb": return "rgba(71, 162, 72, 0.25)";
    case "supabase": return "rgba(62, 207, 142, 0.25)";
    case "mysql": return "rgba(0, 117, 143, 0.25)";
    case "sql": return "rgba(56, 189, 248, 0.25)";
    case "rest apis":
    case "rest api":
    case "api": return "rgba(16, 185, 129, 0.25)";
    case "postman": return "rgba(255, 108, 55, 0.25)";
    case "gemini api":
    case "gemini": return "rgba(155, 93, 229, 0.25)";
    case "git": return "rgba(240, 80, 50, 0.25)";
    case "github": return "rgba(255, 255, 255, 0.25)";
    case "vs code":
    case "vscode": return "rgba(0, 122, 204, 0.25)";
    case "antigravity ai":
    case "antigravity": return "rgba(168, 85, 247, 0.25)";
    case "netlify": return "rgba(0, 199, 183, 0.25)";
    case "vercel": return "rgba(255, 255, 255, 0.25)";
    default: return "rgba(var(--primary-rgb), 0.25)";
  }
};

const getSkillIcon = (name: string) => {
  const normalized = name.toLowerCase().trim();
  switch (normalized) {
    case "html":
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.662 10.395-.002.24-2.61H5.847l.7 7.937h7.244l-.276 3.013-2.538.685-2.557-.687-.168-1.888H5.66l.33 3.76 5.98 1.616 5.952-1.613.82-9.155H8.531z" fill="#E34F26"/>
        </svg>
      );
    case "css":
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm5.09 5.093l.235 2.613h10.45l-.238 2.632H6.963l.233 2.611h9.919l-.49 5.438-4.637 1.253-4.664-1.253-.3-3.361h2.623l.156 1.705 2.185.59 2.193-.59.227-2.51H5.143L4.5 5.093h12.09z" fill="#1572B6"/>
        </svg>
      );
    case "javascript":
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <rect width="24" height="24" fill="#F7DF1E" rx="3"/>
          <path d="M19.98 17.8c-.28 1.4-1.62 2.2-3.1 2.2-2.14 0-3.3-1.28-3.3-3.23h2.6c0 .76.43 1.13 1.05 1.13.43 0 .73-.24.73-.65 0-.82-.72-.94-1.82-1.32-.97-.33-2.12-.86-2.12-2.28 0-1.36 1-2.25 2.76-2.25 1.62 0 2.65.86 2.8 2.1h-2.45c-.1-.4-.28-.65-.67-.65-.33 0-.58.17-.58.46 0 .66.7.75 1.63 1.12.98.37 2.3.83 2.3 2.38v.29zM10.82 12h2.53v6.3c0 2.2-1.26 3.08-3.33 3.08-1.8 0-2.85-.92-3.08-2.2h2.5c.12.5.42.76.9.76.44 0 .7-.22.7-.85V12z" fill="#000000"/>
        </svg>
      );
    case "reactjs":
    case "react":
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(0 12 12)"/>
          <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 12 12)"/>
          <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 12 12)"/>
          <circle cx="12" cy="12" r="2" fill="#61DAFB"/>
        </svg>
      );
    case "express":
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <rect width="24" height="24" fill="#353535" rx="6"/>
          <text x="12" y="16" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">ex</text>
        </svg>
      );
    case "node.js":
    case "nodejs":
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <path d="M21.1 6.5l-8.5-4.9c-.4-.2-.8-.2-1.2 0L2.9 6.5c-.4.2-.6.7-.6 1.1v9.8c0 .5.3.9.6 1.1l8.5 4.9c.2.1.4.2.6.2s.4-.1.6-.2l8.5-4.9c.4-.2.6-.7.6-1.1V7.6c0-.4-.2-.9-.6-1.1zm-9.1 13.9L4.8 16.3V7.7l7.2 4.1v8.6zm1-10.2l-7.2-4.1 7.2-4.1 7.2 4.1-7.2 4.1zm7.2 6.1l-7.2 4.1V11.8l7.2-4.1v8.6z" fill="#339933"/>
        </svg>
      );
    case "jquery":
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.666 8.528c-.144.336-.348.636-.612.9-.66.66-1.428.984-2.304.972l.06-.06c.492-.492.744-1.092.756-1.8.012-.708-.216-1.308-.684-1.8-.468-.492-1.056-.732-1.764-.72-1.392.024-2.124.96-2.196 2.808-.024.6.144 1.152.504 1.656.36.504.84.828 1.44.972-1.116.348-2.22.42-3.312.216-.408-.072-.816-.18-1.224-.324-.312-.108-.624-.24-.936-.396.6-.78 1.404-1.212 2.412-1.296.696-.06 1.308.12 1.836.54.12.096.24.168.36.216.036.012.06.012.084 0a1.14 1.14 0 0 0 .156-.12l.144-.144a.12.12 0 0 0 0-.168c-.624-.768-1.44-1.164-2.448-1.188-1.416-.036-2.52.456-3.312 1.476a.12.12 0 0 0 .048.18c.84.456 1.74.72 2.7.792 1.104.084 2.196-.084 3.276-.504a3.83 3.83 0 0 1-.9.84c-.756.516-1.608.744-2.556.684-1.236-.084-2.256-.636-3.06-1.656a.12.12 0 0 0-.192-.012c-.528.696-.864 1.476-1.008 2.34-.144.864-.06 1.704.252 2.52a.12.12 0 0 0 .18.06c.948-.564 1.956-.84 3.024-.828.984.012 1.908.24 2.772.684.144.072.288.132.432.18.06.024.12.012.156-.036a5.53 5.53 0 0 0 .612-.876c.468-.828.696-1.728.684-2.7-.012-.66-.156-1.284-.432-1.872z" fill="#0769AD"/>
        </svg>
      );
    case "tailwind css":
    case "tailwindcss":
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.597 14.83 11.8 18 11.8c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.003 15.17 4.8 12.001 4.8zm-6 7c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.597 8.83 18.8 12 18.8c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.003 9.17 11.8 6.001 11.8z" fill="#06B6D4"/>
        </svg>
      );
    case "bootstrap":
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <rect width="24" height="24" fill="#7952B3" rx="5"/>
          <path d="M14.017 12.484c.783-.437 1.25-1.18 1.25-2.186 0-1.74-1.265-2.632-3.526-2.632H7.2v11h4.86c2.518 0 3.844-.954 3.844-2.822 0-1.464-.913-2.91-2.887-3.36zm-4.32-3.155h2.26c1.077 0 1.705.416 1.705 1.218 0 .809-.628 1.238-1.706 1.238H9.697V9.33zm2.548 8.163h-2.548v-2.993h2.548c1.196 0 1.86.48 1.86 1.488 0 1.021-.664 1.505-1.86 1.505z" fill="#FFFFFF"/>
        </svg>
      );
    case "motion.dev":
    case "framer motion":
    case "framer-motion":
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <path d="M0 0h12l12 12H12L0 0zm0 12h12l12 12H12L0 12zm12-12h12v12H12V0z" fill="#F43F5E"/>
        </svg>
      );
    case "mongodb":
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <path d="M12 0C10.74 0 7.74 3.75 6.48 9.38 5.22 15 7.11 20.25 12 24c4.89-3.75 6.78-9 5.52-14.62C16.26 3.75 13.26 0 12 0zm1.38 18.38c-.36.36-.9.36-1.26 0l-3.36-3.36a.9.9 0 0 1 0-1.26.9.9 0 0 1 1.26 0l1.83 1.83V6.3a.9.9 0 1 1 1.8 0v9.29l1.83-1.83a.9.9 0 0 1 1.26 0c.35.35.35.91 0 1.26l-3.36 3.36z" fill="#47A248"/>
        </svg>
      );
    case "supabase":
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <path d="M21.36 10.02a.86.86 0 0 0-.69-.32H13.6L16.23.9a.86.86 0 0 0-1.52-.72L2.64 13.98a.86.86 0 0 0 .69 1.42h7.07L7.77 23.1a.86.86 0 0 0 1.52.72l12.07-13.8a.86.86 0 0 0 0-1z" fill="#3ECF8E"/>
        </svg>
      );
    case "mysql":
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.815 15.228c-.89.043-1.748-.28-2.316-.906a2.64 2.64 0 0 1-.726-1.874c.004-.848.455-1.597 1.157-1.921 1.218-.564 3.012-.663 3.864-.176.108.062.138.196.069.291a1.23 1.23 0 0 1-.161.18c-.808.775-2.096 1.054-3.136.68a.95.95 0 0 0-1.127.398c-.14.24-.183.52-.119.789a.82.82 0 0 0 .548.583c.725.247 1.517.151 2.164-.263a.13.13 0 0 1 .184.027l.79.913a.13.13 0 0 1-.107.219zm5.342-3.844c-.783.578-1.895.776-2.863.504a.12.12 0 0 1-.082-.147l.477-2.152a.12.12 0 0 1 .184-.078c.84.536 1.488 1.408 1.344 2.45a.12.12 0 0 1-.06.082l-.999-.66zm1.189-3.21c-.417.828-1.258 1.396-2.179 1.472a.12.12 0 0 1-.122-.09l-.497-2.228a.12.12 0 0 1 .151-.138c1.077.311 2.054 1.123 2.122 2.378a.12.12 0 0 1-.06.105l-.558.497z" fill="#00758F"/>
        </svg>
      );
    case "sql":
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3"/>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>
        </svg>
      );
    case "rest apis":
    case "rest api":
    case "api":
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
        </svg>
      );
    case "postman":
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.176 8.796c-.328 1.135-1.282 2.656-2.52 3.805a9.55 9.55 0 0 1-3.6 2.222.44.44 0 0 1-.504-.132l-.994-1.218a.43.43 0 0 1 .054-.593c.896-.757 2.124-1.921 2.766-2.909.432-.66.666-1.385.69-2.148v-.156a.43.43 0 0 1 .48-.426h1.2a.43.43 0 0 1 .426.555z" fill="#FF6C37"/>
        </svg>
      );
    case "gemini api":
    case "gemini":
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <path d="M12 0c0 6.627 5.373 12 12 12-6.627 0-12 5.373-12 12 0-6.627-5.373-12-12-12 6.627 0 12-5.373 12-12z" fill="url(#gemini-grad-lg)"/>
          <defs>
            <linearGradient id="gemini-grad-lg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9b5de5"/>
              <stop offset="50%" stopColor="#f15bb5"/>
              <stop offset="100%" stopColor="#00bbf9"/>
            </linearGradient>
          </defs>
        </svg>
      );
    case "git":
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <path d="M23.384 11.616L12.384.616a1.956 1.956 0 0 0-2.768 0L6.96 3.272l3.432 3.432a2.385 2.385 0 0 1 3.088 3.088l3.12 3.12a2.385 2.385 0 1 1-.984.984l-3.08-3.08a2.38 2.38 0 0 1-2.912-.048L6.872 13.52a2.385 2.385 0 1 1-1.024-.96l2.768-2.768a2.38 2.38 0 0 1-.048-2.912L5.136 5.448l-4.52 4.52a1.956 1.956 0 0 0 0 2.768l11 11a1.956 1.956 0 0 0 2.768 0l9.016-9.016a1.956 1.956 0 0 0 0-2.864z" fill="#F05032"/>
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-foreground" fill="currentColor">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
        </svg>
      );
    case "vs code":
    case "vscode":
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <path d="M23.986 6.568L18.5.656a.712.712 0 0 0-1.036.14L11.517 9.1 4.542 3.966a.712.712 0 0 0-.964.126L.188 7.7a.712.712 0 0 0 .028.98L4.3 12.062l-4.084 3.382a.712.712 0 0 0-.028.98l3.39 3.608a.712.712 0 0 0 .964.126l6.975-5.134 5.947 8.304a.712.712 0 0 0 1.036.14l5.486-5.912a.712.712 0 0 0 .014-.972L18.724 12l5.276-5.46a.712.712 0 0 0-.014-.972zm-7.662 5.432l-3.9-3.328 3.9-3.9 1.636 1.764v3.664zm-5.74 0L7 14.8V9.2zm5.74 1.464v3.664l-1.636 1.764-3.9-3.9 3.9-3.328z" fill="#007ACC"/>
        </svg>
      );
    case "antigravity ai":
    case "antigravity":
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <ellipse cx="12" cy="12" rx="10" ry="3" stroke="#A855F7" strokeWidth="1.5" transform="rotate(-30 12 12)"/>
          <ellipse cx="12" cy="12" rx="10" ry="3" stroke="#06B6D4" strokeWidth="1.5" transform="rotate(30 12 12)"/>
          <circle cx="12" cy="12" r="3.5" fill="#EC4899"/>
        </svg>
      );
    case "netlify":
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <path d="M6.49 19.04h-.23L5.13 17.9v-.23l1.73-1.71h1.2l.15.15v1.2L6.5 19.04ZM5.13 6.31V6.1l1.13-1.13h.23L8.2 6.68v1.2l-.15.15h-1.2L5.13 6.31Zm9.96 9.09h-1.65l-.14-.13v-3.83c0-.68-.27-1.2-1.1-1.23-.42 0-.9 0-1.43.02l-.07.08v4.96l-.14.14H8.9l-.13-.14V8.73l.13-.14h3.7a2.6 2.6 0 0 1 2.61 2.6v4.08l-.13.14Zm-8.37-2.44H.14L0 12.82v-1.64l.14-.14h6.58l.14.14v1.64l-.14.14Zm17.14 0h-6.58l-.14-.14v-1.64l.14-.14h6.58l.14.14v1.64l-.14.14ZM11.05 6.55V1.64l.14-.14h1.65l.14.14v4.9l-.14.14h-1.65l-.14-.13Zm0 15.81v-4.9l.14-.14h1.65l.14.13v4.91l-.14.14h-1.65l-.14-.14Z" fill="#00C7B7"/>
        </svg>
      );
    case "vercel":
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-foreground" fill="currentColor">
          <path d="m12 1.608 12 20.784H0Z"/>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      );
  }
};

const skills = [
  { name: "ReactJS" },
  { name: "Tailwind CSS" },
  { name: "CSS" },
  { name: "HTML" },
  { name: "JavaScript" },
  { name: "Node.js" },
  { name: "Express" },
  { name: "MongoDB" },
  { name: "Supabase" },
  { name: "MySQL" },
  { name: "SQL" },
  { name: "jQuery" },
  { name: "Bootstrap" },
  { name: "Motion.dev" },
  { name: "REST APIs" },
  { name: "Postman" },
  { name: "Gemini API" },
  { name: "Git" },
  { name: "GitHub" },
  { name: "VS Code" },
  { name: "Antigravity AI" },
  { name: "Netlify" },
  { name: "Vercel" },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">
            Tech <span className="text-gradient">Stack</span>
          </h2>
          <p className="section-subheading mx-auto">
            Technologies I work with to bring ideas to life
          </p>
        </motion.div>

        {/* Unified Centered Flex-Grid container of beautiful Square Brand Tiles */}
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {skills.map((skill, skillIndex) => {
            const isHovered = hoveredSkill === skill.name;
            const glowColor = getBrandColor(skill.name);
            const borderColor = glowColor.replace("0.25", "0.5").replace("0.15", "0.4");
            
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.4,
                  delay: skillIndex * 0.04 + 0.2,
                }}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                className="w-16 h-16 rounded-2xl bg-[#0d1527]/60 border border-border/40 flex items-center justify-center cursor-pointer transition-all duration-300 relative group"
                style={
                  isHovered
                    ? {
                        boxShadow: `0 0 25px ${glowColor}`,
                        borderColor: borderColor,
                        transform: "translateY(-4px) scale(1.05)",
                        backgroundColor: "#0d1527",
                      }
                    : {}
                }
              >
                {/* Brand Icon */}
                <div className="w-8 h-8 flex items-center justify-center transition-transform duration-300">
                  {getSkillIcon(skill.name)}
                </div>

                {/* Highly elegant micro-tooltip */}
                <span className="absolute -bottom-10 bg-card/90 backdrop-blur-sm border border-border/80 text-foreground text-xs font-semibold px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 translate-y-1 group-hover:translate-y-0 z-50 shadow-md whitespace-nowrap">
                  {skill.name}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Skill Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-card border border-border/50">
            <span className="text-primary">💡</span>
            <span className="text-muted-foreground text-sm">
              Always learning, always growing, technology never stops evolving
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
