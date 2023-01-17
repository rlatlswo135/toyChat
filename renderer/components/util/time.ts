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
    console.error(err);
    return "error";
  }
};

export const toTime = (time: string) => {
  const [formatTime, afterTw] = format(new Date(time), "p").split(" ");

  if (afterTw === "AM") return `오전 ${formatTime}`;
  return `오후 ${formatTime}`;
};

export const toDate = (time: string) => format(new Date(time), "MM-dd");
export const toYear = (time: string) => format(new Date(time), "yyyy-MM-dd");

export const getNow = () => format(new Date(), "yyyy-MM-dd KK:mm:ss");
export const getNowDate = () => format(new Date(), "yyyy-MM-dd");
export const toJson = <T>(item: T): string => JSON.stringify(item);

export const timeFormat = (time: string) => {
  if (!time) {
    return "";
  }
  const result = toTimeDistance(getNow(), time);
  switch (result) {
    case "error":
      return "";
    case "today":
      return toTime(time);
    case "1day":
      return "어제";
    case "2day":
      return "그저께";
    case "month":
    case "days":
      return toDate(time);
    default:
      return toYear(time);
  }
};
