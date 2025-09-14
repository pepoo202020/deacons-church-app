"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/providers/Language-Provider/language-provider";

export default function Home() {
  const { t, setLanguage } = useLanguage();
  return (
    <div className="font-lora">
      {String(t("title"))}
      <Button onClick={() => setLanguage("co")}>lang</Button>
    </div>
  );
}
