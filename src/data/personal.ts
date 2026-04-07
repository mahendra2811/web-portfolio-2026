export const personalInfo = {
  name: "Mahendra Singh",
  title: "Software Developer & AI Enthusiast",
  tagline: "Crafting pixel-perfect, performant web experiences with AI-powered solutions",
  email: "mahendrapuniya92@gmail.com",
  phone: "+91-7568265755",
  location: "India",
  linkedin: "https://linkedin.com/in/pooniyamahendra",
  github: "https://github.com/mahendra2811",
  portfolio: "https://mahendra-next-portfolio.vercel.app",
  resumeUrl: "/resume/Mahendra_Singh_Puniya_Resume.pdf",
  profilePhoto: "/images/profile.jpg",
  bio: {
    short:
      "Full-stack developer specializing in React, Next.js, and modern web technologies with extensive AI/ML knowledge. Building performant, accessible, and intelligent digital experiences.",
    long: "I'm Mahendra Singh Puniya, a passionate full-stack developer with a B.Tech in Computer Science from IIIT Dharwad. I specialize in building high-performance web applications using React.js, Next.js, and the modern JavaScript ecosystem, complemented by extensive knowledge in Artificial Intelligence and Machine Learning. With experience at Primathon as both an intern and associate developer, I've delivered measurable impact — reducing load times by 40%, achieving 90%+ test coverage, and cutting API latency by 35%. My academic foundation in AI/ML enables me to integrate intelligent solutions into modern web applications. When I'm not coding, I'm solving DSA problems (500+ and counting) or exploring cutting-edge AI technologies. I believe great software is an intersection of engineering excellence, thoughtful design, and intelligent automation.",
  },
} as const;

export const education = [
  {
    institution: "Indian Institute of Information Technology, Dharwad",
    shortName: "IIIT Dharwad",
    degree: "Bachelor of Technology",
    field: "Computer Science and Engineering",
    duration: "2020 – 2024",
    cpi: "7.0",
    coursework: [
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Operating Systems",
      "Artificial Intelligence",
      "Machine Learning",
      "Computer Networks",
    ],
  },
] as const;

export const experience = [
  {
    id: "primathon-sde",
    company: "Primathon",
    role: "Associate Software Developer",
    type: "Full-time" as const,
    duration: "April 2025 – Present",
    location: "India",
    description:
      "Building and maintaining scalable web applications using React.js and Next.js ecosystem. Leading frontend development initiatives with focus on performance optimization and code quality.",
    responsibilities: [
      "Architecting and developing responsive web applications using React.js and Next.js",
      "Implementing authentication flows with JWT and Firebase Auth",
      "Building RESTful APIs with MongoDB and PostgreSQL backends",
      "Setting up CI/CD pipelines using GitHub Actions and Vercel",
      "Writing comprehensive tests achieving 90%+ coverage with Jest and React Testing Library",
      "Optimizing application performance resulting in 40% load time reduction",
      "Reducing API response latency by 35% through query optimization",
      "Building internal tools that reduced manual effort by 60%",
    ],
    techStack: [
      "React.js",
      "Next.js",
      "TypeScript",
      "MongoDB",
      "PostgreSQL",
      "JWT",
      "Firebase Auth",
      "GitHub Actions",
      "Vercel",
      "AWS",
      "Jest",
      "React Testing Library",
    ],
    metrics: [
      { label: "Load Time Reduction", value: "40%", icon: "Zap" },
      { label: "Test Coverage", value: "90%+", icon: "Shield" },
      { label: "API Latency Cut", value: "35%", icon: "Activity" },
      { label: "Manual Effort Saved", value: "60%", icon: "Clock" },
    ],
  },
  {
    id: "primathon-intern",
    company: "Primathon",
    role: "Software Developer Intern",
    type: "Internship" as const,
    duration: "January 2024 – March 2024",
    location: "India",
    description:
      "Contributed to frontend development projects in an Agile environment, building responsive UI components and data visualizations.",
    responsibilities: [
      "Developed responsive UI components using React.js and Tailwind CSS",
      "Created interactive data visualizations using Chart.js",
      "Participated in Agile sprint ceremonies and code reviews",
      "Collaborated with design and backend teams for feature delivery",
    ],
    techStack: ["React.js", "Tailwind CSS", "Chart.js", "JavaScript", "Git"],
    metrics: [],
  },
] as const;

export const achievements = [
  {
    title: "500+ DSA Problems",
    description: "Solved on LeetCode and GeeksForGeeks",
    icon: "Code",
    link: "#",
  },
  {
    title: "NCC 'B' Certificate",
    description: "National Cadet Corps certified",
    icon: "Award",
    link: null,
  },
] as const;

export const stats = [
  { label: "Years of Experience", value: "2+", icon: "Calendar" },
  { label: "Projects Completed", value: "15+", icon: "Folder" },
  { label: "DSA Problems Solved", value: "700+", icon: "Code" },
  { label: "Technologies", value: "25+", icon: "Layers" },
] as const;
