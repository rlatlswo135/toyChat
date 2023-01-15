import { format, formatDistance } from "date-fns";

type TimeDistance =
  | "today"
  | "1day"
  | "2day"
  | "days"
  | "month"
  | "year"
  | "error";

export const toTimeDistance = (now: string, base: string): TimeDistance => {
  try {
    const result = formatDistance(new Date(now), new Date(base));

    if (result === "1 day") {
      return "1day";
    }

    if (result === "2 days") {
      return "2day";
    }

    if (result.includes("days")) {
      return "days";
    }

    if (result.includes("month") || result.includes("months")) {
      return "month";
    }

    if (result.includes("year") || result.includes("years")) {
      return "year";
    }

    return "today";
  } catch (err) {
    return "error";
    console.error(err);
  }
};

export const toTime = (time: string) => {
  const [formatTime, afterTw] = format(new Date(time), "p").split(" ");

  if (afterTw === "AM") return `오전 ${formatTime}`;
  return `오후 ${formatTime}`;
};

export const toDate = (time: string) => format(new Date(time), "MM-dd");
export const toYear = (time: string) => format(new Date(time), "yyyy-MM-dd");

export const getNow = () => format(new Date(), "yyyy-MM-dd");
export const toJson = <T>(item: T): string => JSON.stringify(item);
