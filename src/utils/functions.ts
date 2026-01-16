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
