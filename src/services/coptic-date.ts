import { TLanguages } from "@/interfaces/interfaces";

const copticMonthsEn = [
  "Thout",
  "Paopi",
  "Hathor",
  "Koiak",
  "Tobi",
  "Meshir",
  "Paremhat",
  "Paremoude",
  "Pashons",
  "Paoni",
  "Epip",
  "Masori",
  "Pi kogi Enavot",
];
const copticMonthsAr = [
  "توت",
  "بابه",
  "هاتور",
  "كيهك",
  "طوبه",
  "امشير",
  "برمهات",
  "برموده",
  "بشنس",
  "بؤونه",
  "أبيب",
  "مسرى",
  "نسي",
];
const copticMonthsCo = [
  "Ⲑⲱⲟⲩⲧ",
  "Ⲡⲁⲟⲡⲓ",
  "Ⲁⲑⲱⲣ",
  "Ⲕⲟⲓⲁϩⲕ",
  "Ⲧⲱⲃⲓ",
  "Ⲙⲉϣⲓⲣ",
  "Ⲡⲁⲣⲉⲙϩⲁⲧ",
  "Ⲡⲁⲣⲙⲟⲩⲧⲉ",
  "Ⲡⲁϣⲟⲛⲥ",
  "Ⲡⲁⲱⲛⲓ",
  "Ⲉⲡⲏⲡ",
  "Ⲙⲉⲥⲱⲣⲓ",
  "Ⲡⲓⲕⲟⲩϫⲓ ⲛ̀ⲁⲃⲟⲧ",
];

function isGregorianLeepYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function getCopticDate(
  date: Date = new Date(),
  language: TLanguages
): string {
  // get gregorian values
  const [gYear, gMonth, gDay] = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  ];
  // coptic new year 1 thout
  const newYear = new Date(gYear, 8, isGregorianLeepYear(gYear - 1) ? 12 : 11);

  if (date < newYear) {
    return getCopticDate(new Date(gYear - 1, gMonth - 1, gDay), language);
  }

  const daysSinceNewYear = Math.floor(
    (date.getTime() - newYear.getTime()) / (1000 * 60 * 60 * 24)
  );

  const copticYear = gYear - 284;

  let copticMonth = Math.floor(daysSinceNewYear / 30);
  let copticDay = (daysSinceNewYear % 30) + 1;
  if (copticMonth > 12) copticMonth = 12;

  if (language === "ar") {
    return `${copticDay} ${copticMonthsAr[copticMonth]} ${copticYear}`;
  } else if (language === "en") {
    return `${copticDay} ${copticMonthsEn[copticMonth]} ${copticYear}`;
  } else {
    return `${copticDay} ${copticMonthsCo[copticMonth]} ${copticYear}`;
  }
}
