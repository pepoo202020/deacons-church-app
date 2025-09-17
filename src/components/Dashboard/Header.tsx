"use client";
import { useLanguage } from "@/providers/Language-Provider/language-provider";
import DashboardLogo from "./DashboardLogo";
import ThemeToggler from "../shared/ThemeToggler";

const DashboardHeader = () => {
  const { t } = useLanguage();
  return (
    <div className="h-20 flex items-center justify-between w-screen overflow-hidden px-10">
      {/* logo */}
      <DashboardLogo t={t} variant="header" />
      {/* Dashboard Title */}
      <div>
        <h1>Dashboard Title</h1>
      </div>

      {/* options */}
      <ThemeToggler isDashboardHeader />
    </div>
  );
};

export default DashboardHeader;
