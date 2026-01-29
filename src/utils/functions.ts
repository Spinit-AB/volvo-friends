// Formats YYYYMMDD to a human-friendly string in Swedish or English
export const formatDateHuman = (
  lang: string,
  dateStr: string,
  showYear: boolean = true,
) => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";
  const year = date.getFullYear().toString();
  const monthLong = date.toLocaleString(lang, { month: "long" });
  const dayNum = date.getDate();

  if (lang.startsWith("sv")) {
    // Swedish: 1:a, 2:a, 3:e, 4:e, 21:a, 22:a, 23:e, etc.
    const isSwedishAOrdinal = (n: number) => {
      const lastDigit = n % 10;
      const lastTwo = n % 100;
      return (
        (lastDigit === 1 || lastDigit === 2) &&
        !(lastTwo === 11 || lastTwo === 12)
      );
    };
    const dayWithSuffix = isSwedishAOrdinal(dayNum) ? `${dayNum}:a` : `${dayNum}:e`;
    return showYear
      ? `${dayWithSuffix} ${monthLong} ${year}`
      : `${dayWithSuffix} ${monthLong}`;
  } else {
    // English: 28th of January 2026 or 28th of January
    const getOrdinal = (n: number) => {
      if (n > 3 && n < 21) return "th";
      switch (n % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };
    const dayWithSuffix = `${dayNum}${getOrdinal(dayNum)}`;
    return showYear
      ? `${dayWithSuffix} of ${monthLong} ${year}`
      : `${dayWithSuffix} of ${monthLong}`;
  }
};
export const formatDateObject = (lang: string, dateStr: string) => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return {
      year: "",
      monthShort: "",
      monthLong: "",
      day: "",
      dayPadded: "",
      weekdayShort: "",
      weekdayLong: "",
    };
  }
  const year = date.getFullYear().toString();
  const monthShort = date.toLocaleString(lang, { month: "short" });
  const monthLong = date.toLocaleString(lang, { month: "long" });
  const day = date.getDate().toString();
  const dayPadded = date.getDate().toString().padStart(2, "0");
  const weekdayShort = date.toLocaleString(lang, { weekday: "short" });
  const weekdayLong = date.toLocaleString(lang, { weekday: "long" });
  return {
    year,
    monthShort,
    monthLong,
    day,
    dayPadded,
    weekdayShort,
    weekdayLong,
  };
};

export const formatDate = (lang: string, dateStr: string) => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return ""; // or return dateStr, or a fallback message
  }
  return new Intl.DateTimeFormat(lang, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};
