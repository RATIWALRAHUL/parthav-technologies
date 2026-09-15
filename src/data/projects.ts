export interface ProjectItem {
  id: string;
  category: string;
  title: string;
  problem: string;
  solution: string;
  services: string;
  metricValue: string;
  metricLabel: string;
  imageSrc: string;
  href: string;
}

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: "real-estate",
    category: "Real Estate",
    title: "Modern Property Platform",
    problem: "Low online visibility & limited lead generation on legacy portal.",
    solution: "Modern website with engaging UI/UX, fast website, SEO & content.",
    services: "UI/UX, Web Development, SEO",
    metricValue: "+38%",
    metricLabel: "qualified enquiries",
    imageSrc: "/images/work/project-realestate.webp",
    href: "#contact",
  },
  {
    id: "healthcare",
    category: "Healthcare",
    title: "Healthcare Booking Platform",
    problem: "Complex booking flow & low user engagement across medical portals.",
    solution: "Simplified UX, patient portal, performance optimization.",
    services: "UI/UX, Web Development, SEO",
    metricValue: "+52%",
    metricLabel: "appointment bookings",
    imageSrc: "/images/work/project-healthcare.webp",
    href: "#contact",
  },
  {
    id: "ecommerce",
    category: "Ecommerce",
    title: "Fashion E-commerce Store",
    problem: "Low conversions & poor mobile UX causing high bounce rate.",
    solution: "Redesigned UX, faster checkout, SEO & product strategy.",
    services: "UI/UX, Web Development, SEO",
    metricValue: "+41%",
    metricLabel: "conversion rate",
    imageSrc: "/images/work/project-ecommerce.webp",
    href: "#contact",
  },
];
