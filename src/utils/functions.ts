export const formatDate = (lang: string, dateStr: string) => {
  return new Intl.DateTimeFormat(lang, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateStr));
};
