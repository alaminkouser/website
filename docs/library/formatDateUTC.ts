export function formatDateUTC(inputDate: string | number | Date): string {
  const date = new Date(inputDate);

  if (isNaN(date.getTime())) return "Invalid Date";

  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).formatToParts(date);

  const day = parts.find((p) => p.type === "day")?.value;
  const month = parts.find((p) => p.type === "month")?.value;
  const year = parts.find((p) => p.type === "year")?.value;

  if (!day || !month || !year) return "Invalid Date";

  return `${month} ${day}, ${year}`;
}
