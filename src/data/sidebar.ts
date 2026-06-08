export type SidebarIconName =
  | "dashboard"
  | "orders"
  | "products"
  | "categories"
  | "customers"
  | "location"
  | "menu"
  | "reports"
  | "reviews"
  | "contact"
  | "settings";

export type SidebarItem = {
  id: string;
  label: string;
  icon: SidebarIconName;
  href?: string;
  hasChevron?: boolean;
  children?: readonly {
    label: string;
    href: string;
  }[];
  ctaLabel?: string;
};

export const sidebarCompany = {
  name: "Cozy Bakes Inc.",
  subtitle: "By Marwa",
  logoSrc: "/images/logo.svg",
} as const;

export const sidebarProfile = {
  initials: "MA",
  name: "Marwa",
  role: "Administrator",
} as const;

export const sidebarItems: SidebarItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "dashboard",
    href: "/",
  },
  {
    id: "orders",
    label: "Orders",
    icon: "orders",
    href: "/orders",
  },
  {
    id: "products",
    label: "Products",
    icon: "products",
    href: "/products",
  },
  {
    id: "categories",
    label: "Categories",
    icon: "categories",
    href: "/categories",
  },
  {
    id: "customers",
    label: "Customers",
    icon: "customers",
    href: "/customers",
  },
  {
    id: "find-us",
    label: "Find Us Here",
    icon: "location",
    href: "/find-us-here",
  },
  {
    id: "our-menu",
    label: "Our Menu",
    icon: "menu",
    href: "/menu",
  },
  {
    id: "reports",
    label: "Reports",
    icon: "reports",
    href: "/reports",
  },
  {
    id: "reviews",
    label: "Reviews",
    icon: "reviews",
    href: "/reviews",
  },
  {
    id: "contact",
    label: "Contact us",
    icon: "contact",
    href: "/contact-us",
  },
  {
    id: "settings",
    label: "Settings",
    icon: "settings",
    href: "/settings",
  },
] as const;

export const sidebarSignOutLabel = "Sign Out";
