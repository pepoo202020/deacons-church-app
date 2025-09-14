"use client";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./Therme-Provider/theme-provider";
import { LanguageProvider } from "./Language-Provider/language-provider";
import { ChurchSeasonsProvider } from "./Church-Seasons-Provider/church-season-provider";

interface IProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: IProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <LanguageProvider>
        <ChurchSeasonsProvider>{children}</ChurchSeasonsProvider>
        <Toaster richColors position="top-center" />
      </LanguageProvider>
    </ThemeProvider>
  );
}
