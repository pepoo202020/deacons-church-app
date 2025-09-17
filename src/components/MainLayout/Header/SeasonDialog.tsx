import DailyVerse from "@/components/shared/DailyVerse";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { TLanguages } from "@/interfaces/interfaces";
import { getCopticDate } from "@/services/coptic-date";
import Image from "next/image";

interface ISeasonDialogProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  isRtl: boolean;
  t: (key: string, options?: any) => string | object;
  language: TLanguages;
}

const SeasonDialog = ({
  open,
  onOpenChange,
  isRtl,
  t,
  language,
}: ISeasonDialogProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        dir={isRtl ? "rtl" : "ltr"}
        className="bg-blue-950 text-center p-5 flex flex-col items-center justify-between "
      >
        <div className="flex flex-col items-center gap-10">
          {/* OCCASION DETAILS */}
          <div className="w-full px-10 flex flex-col items-center justify-center gap-5">
            <h1>{String(t("seasonSheetTitle"))}</h1>
            <div className="relative overflow-hidden w-full h-72 rounded-xl cursor-pointer">
              <Image src="/images/occasionImg.jpg" alt="Occasion Image" fill />
              <div className="w-full h-full absolute bg-blue-950/55 hover:bg-blue-950/80 transition-all duration-700 flex flex-col items-center justify-center gap-3 text-white">
                <div className="space-y-2 w-full flex flex-col items-center">
                  <h1 className="font-bold text-xl">
                    {String(t("occasionTitleEx"))}
                  </h1>
                  <div className="h-px w-1/2 bg-white/50" />
                </div>
                <p>{String(t("occasionSubTitleEx"))}</p>
              </div>
            </div>
          </div>
          {/* VERSE DETAILS */}
          <div className="w-full px-10 flex flex-col items-start gap-2">
            <h1>{String(t("verseSheetTitle"))}</h1>
            <DailyVerse />
          </div>
        </div>

        {/* COPTIC DATE, BIRTH DATE, VERSION */}
        <div className="">
          <h2>{getCopticDate(new Date(), language)}</h2>
          <h2>Birth Date</h2>
          <h2>synaxar data</h2>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SeasonDialog;
