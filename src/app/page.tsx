"use client";

import LoaderComponent from "@/components/shared/LoaderComponent";
import { useLanguage } from "@/providers/Language-Provider/language-provider";
import { useState, useEffect } from "react";

export default function Home() {
  const { t, isLoading, language } = useLanguage();
  const [isTranslationReady, setIsTranslationReady] = useState(false);

  useEffect(() => {
    // Check if translation is ready and not loading
    if (!isLoading && language) {
      setIsTranslationReady(true);
    }
  }, [isLoading, language]);

  // Show loading state
  if (isLoading || !isTranslationReady) {
    return <LoaderComponent />;
  }

  return <div>{String(t("title"))}</div>;
}
