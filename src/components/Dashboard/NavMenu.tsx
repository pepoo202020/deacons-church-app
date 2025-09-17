"use client";
import { NavItems } from "@/data/navItems";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/providers/Language-Provider/language-provider";
import { usePathname } from "next/navigation";

const DashboardNavMenu = () => {
  const { language } = useLanguage();
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className="h-15 w-screen flex items-center justify-center gap-5">
      {NavItems.map((item) => (
        <div
          key={item.id}
          className={cn(
            "h-full flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-orange-400 px-2",
            item.link === pathname && "bg-orange-400"
          )}
        >
          <item.icon size={20} />
          <h5>{language === "ar" ? item.title.ar : item.title.en}</h5>
        </div>
      ))}
    </div>
  );
};

export default DashboardNavMenu;
