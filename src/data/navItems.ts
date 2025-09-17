import { Calendar, LayoutDashboard, LucideIcon } from "lucide-react";

interface INavMenuItems {
  id: number;
  title: { ar: string; en: string };
  icon: LucideIcon;
  link: string;
}

export const NavItems: INavMenuItems[] = [
  {
    id: 1,
    title: {
      ar: "الصفحة الرئيسية",
      en: "Layout",
    },
    icon: LayoutDashboard,
    link: "/dashboard",
  },
  {
    id: 2,
    title: {
      ar: "التقويم",
      en: "Calendar",
    },
    icon: Calendar,
    link: "/dashboard/calendar",
  },
];
