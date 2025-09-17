"use client";
import { useLanguage } from "@/providers/Language-Provider/language-provider";
import { BookOpen } from "lucide-react";

const CalendarTitle = () => {
  const { t } = useLanguage();
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BookOpen className="w-6 h-6" />
          {String(t("calendarTitle"))}
        </h1>
        <p className="text-muted-foreground">{String(t("calendarSubtitle"))}</p>
      </div>
    </div>
  );
};

export default CalendarTitle;
