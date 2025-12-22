import {
  Home,
  Compass,
  Library,
  Layers,
  CreditCard,
  Gift,
  Settings,
} from "lucide-react";

export const navItems = [
  { label: "Home", icon: Home, href: "/dashboard" },
  { label: "Discover", icon: Compass, href: "/dashboard/discover" },
  { label: "Library", icon: Library, href: "/dashboard/library" },
  { label: "Tech Stack", icon: Layers, href: "/dashboard/tech-stack" },
  {
    label: "Subscriptions",
    icon: CreditCard,
    href: "/dashboard/subscriptions",
  },
  {
    label: "Rewards Hub",
    icon: Gift,
    href: "/dashboard/rewards",
    active: true,
  },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
];
interface IUser {
  firstName: string;
}
export const navbarConfig = {
  "/dashboard": {
    title: "Dashboard",
    subtitle: (user: IUser) => `Welcome, ${user?.firstName || "Sarah"}`,
  },
  "/dashboard/discover": {
    title: "Discover",
    subtitle: "",
  },
  "/dashboard/library": {
    title: "Library",
    subtitle: "Your personal library of tools.",
  },
  "/dashboard/tech-stack": {
    title: "Tech Stacks",
    subtitle:
      "Curated Tech Stacks of tools tailored to specific tasks or projects.",
  },
  "/dashboard/subscriptions": {
    title: "Subscriptions",
    subtitle: "",
  },
  "/dashboard/rewards": {
    title: "Reward Hub",
    subtitle: "Earn points, unlock rewards, and celebrate your progress!",
  },
  "/dashboard/settings": {
    title: "Settings",
    subtitle: "",
  },
};
export type NavbarRoute = keyof typeof navbarConfig;
