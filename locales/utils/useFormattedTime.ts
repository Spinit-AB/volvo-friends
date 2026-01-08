export const useFormattedTime = (lang: string) => {
  if (lang === "sv")
    return (startTime: string, endTime?: string) => {
      const format = (t: string) => {
        if (!t) return "";
        const match = t.match(/^([01]\d|2[0-3])[:.\s]?([0-5]\d)$/);
        if (!match) return t;
        return `${match[1]}:${match[2]}`;
      };
      return `Kl ${format(startTime)}${endTime ? ` - ${format(endTime)}` : ""}`;
    };
  if (lang === "en")
    return (startTime: string, endTime?: string) => {
      const format = (t: string) => {
        if (!t) return "";
        // Accepts HH:mm, HH.mm, HHmm
        const match = t.match(/^([01]\d|2[0-3])[:.\s]?([0-5]\d)$/);
        if (!match) return t;
        let hour = parseInt(match[1], 10);
        const minute = match[2];
        const ampm = hour >= 12 ? "PM" : "AM";
        if (hour === 0) hour = 12;
        else if (hour > 12) hour -= 12;
        return `${hour}:${minute} ${ampm}`;
      };
      return `${format(startTime)}${endTime ? ` - ${format(endTime)}` : ""}`;
    };
  return (startTime: string, endTime?: string) =>
    `${startTime} ${endTime ? `- ${endTime}` : ""}`;
};
