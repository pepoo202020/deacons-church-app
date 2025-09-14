"use client";
import { createContext, useContext, useState } from "react";
import { ChurchSeason } from "@/generated/prisma";

interface IChurchSeasonsContextType {
  seasons: ChurchSeason[];
  churchSeason: ChurchSeason | null;
  setSeasons: (seasons: ChurchSeason[]) => void;
  setChurchSeason: (season: ChurchSeason | null) => void;
}

export const ChurchSeasonsContext =
  createContext<IChurchSeasonsContextType | null>(null);
export const useChurchSeasons = () => useContext(ChurchSeasonsContext);

interface IChurchSeasonsProviderProps {
  children: React.ReactNode;
}

export function ChurchSeasonsProvider({
  children,
}: IChurchSeasonsProviderProps) {
  const [seasons, setSeasons] = useState<ChurchSeason[]>([]);
  const [churchSeason, setChurchSeason] = useState<ChurchSeason | null>(null);

  const value = { seasons, churchSeason, setSeasons, setChurchSeason };

  return (
    <ChurchSeasonsContext.Provider value={value}>
      {children}
    </ChurchSeasonsContext.Provider>
  );
}
