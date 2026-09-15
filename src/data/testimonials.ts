export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  isPlaceholder?: boolean;
}

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "1",
    quote:
      "Professional, responsive and truly understood our vision. Highly recommended!",
    author: "Client Testimonial",
    role: "Founder",
    company: "Real Estate & PropTech",
    avatar: "/images/hero/avatar-1.webp",
    isPlaceholder: true,
  },
  {
    id: "2",
    quote:
      "Excellent design and development support. Our conversions increased significantly.",
    author: "Client Testimonial",
    role: "CEO",
    company: "Healthcare Solutions",
    avatar: "/images/hero/avatar-2.webp",
    isPlaceholder: true,
  },
  {
    id: "3",
    quote:
      "A reliable partner who delivers quality work on time. Great communication and execution.",
    author: "Client Testimonial",
    role: "Director",
    company: "D2C Brand",
    avatar: "/images/hero/avatar-3.webp",
    isPlaceholder: true,
  },
];
