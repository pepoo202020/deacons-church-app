"use client";

import { useEffect } from "react";

interface IDailyVerseProps {}

const DailyVerse = () => {
  useEffect(() => {
    const existingScript = document.getElementById("dailyVersesScript");
    if (existingScript) existingScript.remove();

    const wrapper = document.getElementById("dailyVersesWrapper");
    if (wrapper) wrapper.innerHTML = "";

    const script = document.createElement("script");
    if (script) {
      script.id = "dailyVersesScript";
      script.src = `https://dailyverses.net/get/verse.js?language=${encodeURIComponent(
        "avd"
      )}`;
      script.async = true;
      script.defer = true;

      document.body.appendChild(script);
    }

    return () => {
      script?.remove();
      const w = document.getElementById("dailyVersesWrapper");
      if (w) w.innerHTML = "";
    };
  }, []);
  return (
    <div>
      <div id="dailyVersesWrapper" />
    </div>
  );
};

export default DailyVerse;
