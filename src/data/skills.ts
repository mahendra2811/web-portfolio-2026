export const skills = {
  frontend: {
    label: "Frontend",
    icon: "Monitor",
    color: "#3B82F6",
    items: [
      { name: "React.js", level: 95, years: 3 },
      { name: "Next.js", level: 92, years: 2.5 },
      { name: "TypeScript", level: 90, years: 2 },
      { name: "JavaScript (ES6+)", level: 95, years: 4 },
      { name: "Tailwind CSS", level: 93, years: 2.5 },
      { name: "HTML5/CSS3", level: 95, years: 4 },
      { name: "React Native", level: 80, years: 1 },
      { name: "Expo", level: 78, years: 1 },
      { name: "Vue.js", level: 70, years: 0.5 },
      { name: "Framer Motion", level: 85, years: 1.5 },
      { name: "Three.js", level: 60, years: 0.5 }
    ]
  },
  backend: {
    label: "Backend",
    icon: "Server",
    color: "#10B981",
    items: [
      { name: "Node.js", level: 85, years: 2.5 },
      { name: "Express.js", level: 82, years: 2 },
      { name: "NestJS", level: 65, years: 0.5 },
      { name: "REST APIs", level: 88, years: 3 },
      { name: "GraphQL", level: 60, years: 0.5 }
    ]
  },
  database: {
    label: "Database",
    icon: "Database",
    color: "#8B5CF6",
    items: [
      { name: "PostgreSQL", level: 80, years: 2 },
      { name: "MongoDB", level: 82, years: 2 },
      { name: "Supabase", level: 75, years: 1 },
      { name: "Firebase", level: 78, years: 1.5 },
      { name: "Drizzle ORM", level: 65, years: 0.5 }
    ]
  },
  tools: {
    label: "Tools & DevOps",
    icon: "Wrench",
    color: "#F59E0B",
    items: [
      { name: "Git & GitHub", level: 92, years: 4 },
      { name: "VS Code", level: 95, years: 4 },
      { name: "Docker", level: 65, years: 1 },
      { name: "CI/CD (GitHub Actions)", level: 80, years: 1.5 },
      { name: "Vercel", level: 88, years: 2 },
      { name: "AWS (basics)", level: 60, years: 0.5 },
      { name: "Jest", level: 82, years: 2 },
      { name: "Playwright", level: 65, years: 0.5 },
      { name: "Figma", level: 70, years: 1 }
    ]
  }
} as const;

export type SkillCategory = keyof typeof skills;
