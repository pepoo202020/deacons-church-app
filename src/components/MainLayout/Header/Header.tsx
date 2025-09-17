"use client";
import { useLanguage } from "@/providers/Language-Provider/language-provider";
import Logo from "./Logo";
import { IoMdInformation } from "react-icons/io";
import { useState } from "react";
import SeasonDialog from "./SeasonDialog";

const Header = () => {
  const { t, isRTL, language } = useLanguage();
  const [seasonDialogOpen, setSeasonDialogOpen] = useState<boolean>(false);
  return (
    <>
      <div className="h-16 relative flex items-center justify-center w-screen">
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <Logo t={t} variant="header" />
        </div>
        <div
          className="absolute inset-0 bg-yellow-400 w-10 h-9  cursor-pointer"
          style={{
            clipPath: "polygon(100% 0, 0 0, 100% 100%)",
          }}
          onClick={() => setSeasonDialogOpen(true)}
        >
          <div className="relative">
            <IoMdInformation color="white" className="absolute inset-1" />
          </div>
        </div>
      </div>
      <SeasonDialog
        onOpenChange={(value) => setSeasonDialogOpen(value)}
        open={seasonDialogOpen}
        isRtl={isRTL}
        t={t}
        language={language}
      />
    </>
  );
};

export default Header;
