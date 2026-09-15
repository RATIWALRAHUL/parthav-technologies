export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  iconName: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Discover",
    description: "Understand your goals, users and market.",
    iconName: "Search",
  },
  {
    step: "02",
    title: "Strategy",
    description: "Define roadmap, tech and timeline.",
    iconName: "Compass",
  },
  {
    step: "03",
    title: "UX/UI",
    description: "Create experiences that convert.",
    iconName: "PenTool",
  },
  {
    step: "04",
    title: "Build",
    description: "Develop with quality, speed and security.",
    iconName: "Code2",
  },
  {
    step: "05",
    title: "Launch & Grow",
    description: "Go live and optimize for long-term growth.",
    iconName: "Rocket",
  },
];
