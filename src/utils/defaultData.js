// Theme options. The selected key becomes a CSS class like theme-dark.
export const themes = {
  minimal: {
    name: "Minimal",
    description: "Light and editorial",
  },
  dark: {
    name: "Dark",
    description: "Modern studio",
  },
  colorful: {
    name: "Colorful",
    description: "Creative profile",
  },
};

// Template options. These change the portfolio layout/style without changing user data.
export const portfolioTemplates = {
  developer: {
    name: "Developer",
    description: "Code-first layout",
  },
  designer: {
    name: "Designer",
    description: "Visual portfolio",
  },
  student: {
    name: "Student",
    description: "Education focused",
  },
  freelancer: {
    name: "Freelancer",
    description: "Client-ready profile",
  },
};

// Default drag order for the live preview sections.
export const defaultSectionOrder = ["hero", "skills", "experience", "projects", "contact"];

// Starter data shown when the app opens for the first time or after reset.
export const defaultPortfolio = {
  name: "sanjeet siani",
  bio: "Frontend developer crafting fast, accessible interfaces for SaaS products and creative teams.",
  education: "B.S. Computer Science, Riverside University",
  profileImage: "",
  skills: ["React", "JavaScript", "CSS", "UI Design"],
  experience: [
    {
      role: "Frontend Developer",
      company: "BrightLayer Studio",
      duration: "2024 - Present",
      description: "Built responsive React interfaces, improved accessibility, and shipped reusable component systems.",
    },
  ],
  projects: [
    {
      title: "Launch Metrics Dashboard",
      description: "A responsive analytics dashboard with reusable charts and clean data filtering.",
      link: "https://example.com",
    },
    {
      title: "Portfolio Generator",
      description: "A no-code portfolio tool with theme switching, export, and live content preview.",
      link: "https://example.com",
    },
  ],
  contact: {
    email: "avery@example.com",
    phone: "+1 555 0148",
    linkedin: "https://linkedin.com/in/avery",
    github: "https://github.com/avery",
  },
};
