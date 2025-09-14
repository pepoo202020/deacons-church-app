"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ChurchSeason, SeasonTones } from "@/generated/prisma";
import { getChurchSeasons } from "@/actions/church-seasons/getSeasons";

interface IChurchSeasonsContextType {
  // Data
  seasons: ChurchSeason[];
  currentSeason: ChurchSeason | null;
  upcomingSeasons: ChurchSeason[];
  pastSeasons: ChurchSeason[];

  // State
  isLoading: boolean;
  error: string | null;
  lastFetched: Date | null;

  // Actions
  setSeasons: (seasons: ChurchSeason[]) => void;
  setCurrentSeason: (season: ChurchSeason | null) => void;
  refreshSeasons: () => Promise<void>;
  getSeasonById: (id: string) => ChurchSeason | undefined;
  getSeasonsByTone: (tone: SeasonTones) => ChurchSeason[];
  getSeasonsByDateRange: (startDate: Date, endDate: Date) => ChurchSeason[];

  // Computed values
  hasActiveSeason: boolean;
  nextSeason: ChurchSeason | null;
  seasonCount: number;
}

export const ChurchSeasonsContext =
  createContext<IChurchSeasonsContextType | null>(null);

export function useChurchSeasons() {
  const context = useContext(ChurchSeasonsContext);
  if (!context) {
    throw new Error(
      "useChurchSeasons must be used within a ChurchSeasonsProvider"
    );
  }
  return context;
}

interface IChurchSeasonsProviderProps {
  children: React.ReactNode;
  autoFetch?: boolean;
  refetchInterval?: number;
}

export function ChurchSeasonsProvider({
  children,
  autoFetch = true,
  refetchInterval = 5 * 60 * 1000, // 5 minutes
}: IChurchSeasonsProviderProps) {
  const [seasons, setSeasons] = useState<ChurchSeason[]>([]);
  const [currentSeason, setCurrentSeason] = useState<ChurchSeason | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);

  // Computed values
  const upcomingSeasons = useMemo(() => {
    const now = new Date();
    return seasons
      .filter((season) => new Date(season.startDate) > now)
      .sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      );
  }, [seasons]);

  const pastSeasons = useMemo(() => {
    const now = new Date();
    return seasons
      .filter((season) => new Date(season.endDate) < now)
      .sort(
        (a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
      );
  }, [seasons]);

  const hasActiveSeason = useMemo(() => {
    return currentSeason !== null;
  }, [currentSeason]);

  const nextSeason = useMemo(() => {
    return upcomingSeasons[0] || null;
  }, [upcomingSeasons]);

  const seasonCount = useMemo(() => {
    return seasons.length;
  }, [seasons]);

  // Fetch seasons from Action
  const refreshSeasons = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getChurchSeasons();

      if (!response.success) {
        throw new Error(`Failed to fetch seasons`);
      }

      setSeasons(response.data!);
      setLastFetched(new Date());

      // Find current season based on dates
      const now = new Date();
      const current = response.data!.find((season: ChurchSeason) => {
        const startDate = new Date(season.startDate);
        const endDate = new Date(season.endDate);
        return startDate <= now && endDate >= now;
      });

      setCurrentSeason(current || null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch seasons";
      setError(errorMessage);
      console.error("Error fetching seasons:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get season by ID
  const getSeasonById = useCallback(
    (id: string) => {
      return seasons.find((season) => season.id === id);
    },
    [seasons]
  );

  // Get seasons by tone
  const getSeasonsByTone = useCallback(
    (tone: SeasonTones) => {
      return seasons.filter((season) => season.seasonTone === tone);
    },
    [seasons]
  );

  // Get seasons by date range
  const getSeasonsByDateRange = useCallback(
    (startDate: Date, endDate: Date) => {
      return seasons.filter((season) => {
        const seasonStart = new Date(season.startDate);
        const seasonEnd = new Date(season.endDate);
        return seasonStart <= endDate && seasonEnd >= startDate;
      });
    },
    [seasons]
  );

  // Auto-fetch on mount
  useEffect(() => {
    if (autoFetch) {
      refreshSeasons();
    }
  }, [autoFetch, refreshSeasons]);

  // Auto-refetch interval
  useEffect(() => {
    if (!autoFetch || !refetchInterval) return;

    const interval = setInterval(() => {
      refreshSeasons();
    }, refetchInterval);

    return () => clearInterval(interval);
  }, [autoFetch, refetchInterval, refreshSeasons]);

  // Update current season when seasons change
  useEffect(() => {
    if (seasons.length === 0) return;

    const now = new Date();
    const current = seasons.find((season) => {
      const startDate = new Date(season.startDate);
      const endDate = new Date(season.endDate);
      return startDate <= now && endDate >= now;
    });

    setCurrentSeason(current || null);
  }, [seasons]);

  const value = useMemo(
    () => ({
      // Data
      seasons,
      currentSeason,
      upcomingSeasons,
      pastSeasons,

      // State
      isLoading,
      error,
      lastFetched,

      // Actions
      setSeasons,
      setCurrentSeason,
      refreshSeasons,
      getSeasonById,
      getSeasonsByTone,
      getSeasonsByDateRange,

      // Computed values
      hasActiveSeason,
      nextSeason,
      seasonCount,
    }),
    [
      seasons,
      currentSeason,
      upcomingSeasons,
      pastSeasons,
      isLoading,
      error,
      lastFetched,
      setSeasons,
      setCurrentSeason,
      refreshSeasons,
      getSeasonById,
      getSeasonsByTone,
      getSeasonsByDateRange,
      hasActiveSeason,
      nextSeason,
      seasonCount,
    ]
  );

  return (
    <ChurchSeasonsContext.Provider value={value}>
      {children}
    </ChurchSeasonsContext.Provider>
  );
}

export function useCurrentSeason() {
  const { currentSeason, hasActiveSeason } = useChurchSeasons();
  return { currentSeason, hasActiveSeason };
}

export function useUpcomingSeasons() {
  const { upcomingSeasons, nextSeason } = useChurchSeasons();
  return { upcomingSeasons, nextSeason };
}

export function useSeasonById(id: string) {
  const { getSeasonById } = useChurchSeasons();
  return getSeasonById(id);
}

export function useSeasonsByTone(tone: SeasonTones) {
  const { getSeasonsByTone } = useChurchSeasons();
  return getSeasonsByTone(tone);
}

export function useSeasonsByDateRange(startDate: Date, endDate: Date) {
  const { getSeasonsByDateRange } = useChurchSeasons();
  return getSeasonsByDateRange(startDate, endDate);
}
