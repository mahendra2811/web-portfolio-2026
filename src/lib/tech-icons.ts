import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faReact,
  faNodeJs,
  faJs,
  faHtml5,
  faCss3Alt,
  faVuejs,
  faDocker,
  faGitAlt,
  faGithub,
  faAws,
  faFigma,
  faNpm,
  faNode,
  faPython,
} from "@fortawesome/free-brands-svg-icons";
import {
  faCode,
  faServer,
  faDatabase,
  faWrench,
  faBolt,
  faLayerGroup,
  faGlobe,
  faRocket,
  faCube,
  faCodeBranch,
  faTerminal,
  faFlask,
  faFire,
  faDiagramProject,
  faWandMagicSparkles,
  faGamepad,
  faMobileScreenButton,
  faCloud,
  faGears,
  faVial,
  faTheaterMasks,
  faPaintBrush,
  faCircleNodes,
  faFileCode,
  faBrush,
  faShield,
  faChartLine,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export interface TechIconConfig {
  icon: IconDefinition;
  color: string;
}

export const techIconMap: Record<string, TechIconConfig> = {
  // Frontend
  "React.js": { icon: faReact, color: "#61DAFB" },
  React: { icon: faReact, color: "#61DAFB" },
  "Next.js": { icon: faGlobe, color: "#FFFFFF" },
  TypeScript: { icon: faCode, color: "#3178C6" },
  "JavaScript (ES6+)": { icon: faJs, color: "#F7DF1E" },
  JavaScript: { icon: faJs, color: "#F7DF1E" },
  "Tailwind CSS": { icon: faPaintBrush, color: "#06B6D4" },
  "HTML5/CSS3": { icon: faHtml5, color: "#E34F26" },
  HTML5: { icon: faHtml5, color: "#E34F26" },
  CSS3: { icon: faCss3Alt, color: "#1572B6" },
  "React Native": { icon: faMobileScreenButton, color: "#61DAFB" },
  Expo: { icon: faRocket, color: "#000020" },
  "Vue.js": { icon: faVuejs, color: "#4FC08D" },
  "Framer Motion": { icon: faWandMagicSparkles, color: "#FF0055" },
  "Three.js": { icon: faCube, color: "#049EF4" },
  GSAP: { icon: faBolt, color: "#88CE02" },

  // Backend
  "Node.js": { icon: faNodeJs, color: "#339933" },
  "Express.js": { icon: faServer, color: "#FFFFFF" },
  Express: { icon: faServer, color: "#FFFFFF" },
  NestJS: { icon: faLayerGroup, color: "#E0234E" },
  "REST APIs": { icon: faGlobe, color: "#FF6C37" },
  GraphQL: { icon: faCircleNodes, color: "#E10098" },
  Python: { icon: faPython, color: "#3776AB" },

  // Database
  PostgreSQL: { icon: faDatabase, color: "#4169E1" },
  MongoDB: { icon: faDatabase, color: "#47A248" },
  Supabase: { icon: faBolt, color: "#3FCF8E" },
  Firebase: { icon: faFire, color: "#FFCA28" },
  "Drizzle ORM": { icon: faFileCode, color: "#C5F74F" },
  MySQL: { icon: faDatabase, color: "#4479A1" },
  Redis: { icon: faDatabase, color: "#DC382D" },

  // Tools & DevOps
  "Git & GitHub": { icon: faGitAlt, color: "#F05032" },
  Git: { icon: faGitAlt, color: "#F05032" },
  GitHub: { icon: faGithub, color: "#FFFFFF" },
  "VS Code": { icon: faCode, color: "#007ACC" },
  Docker: { icon: faDocker, color: "#2496ED" },
  "CI/CD (GitHub Actions)": { icon: faGears, color: "#2088FF" },
  "GitHub Actions": { icon: faGears, color: "#2088FF" },
  Vercel: { icon: faRocket, color: "#FFFFFF" },
  "AWS (basics)": { icon: faAws, color: "#FF9900" },
  AWS: { icon: faAws, color: "#FF9900" },
  Jest: { icon: faVial, color: "#C21325" },
  Playwright: { icon: faTheaterMasks, color: "#2EAD33" },
  Figma: { icon: faFigma, color: "#F24E1E" },
  npm: { icon: faNpm, color: "#CB3837" },
  Webpack: { icon: faCube, color: "#8DD6F9" },
  Vite: { icon: faBolt, color: "#646CFF" },

  // Misc
  "Chart.js": { icon: faDiagramProject, color: "#FF6384" },
  JWT: { icon: faCode, color: "#D63AFF" },
  Zustand: { icon: faLayerGroup, color: "#453F39" },
  Sanity: { icon: faBrush, color: "#F03E2F" },
  Resend: { icon: faRocket, color: "#FFFFFF" },
};

export const categoryIconMap: Record<string, TechIconConfig> = {
  languages: { icon: faCode, color: "#F59E0B" },
  frontend: { icon: faCode, color: "#3B82F6" },
  backend: { icon: faServer, color: "#10B981" },
  database: { icon: faDatabase, color: "#8B5CF6" },
  security: { icon: faShield, color: "#EF4444" },
  devops: { icon: faCloud, color: "#22D3EE" },
  tools: { icon: faWrench, color: "#F59E0B" },
  aiEngineering: { icon: faWandMagicSparkles, color: "#A855F7" },
  observability: { icon: faChartLine, color: "#06B6D4" },
  collaboration: { icon: faUsers, color: "#F472B6" },
};

export function getTechIcon(name: string): TechIconConfig {
  return techIconMap[name] || { icon: faCode, color: "#6366F1" };
}
