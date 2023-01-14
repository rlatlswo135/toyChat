import { format, formatDistance } from "date-fns";
import { Timestamp } from "firebase/firestore";

type TimeDistance =
  | "today"
  | "1day"
  | "2day"
  | "days"
  | "month"
  | "year"
  | "error";

export const toTimeDistance = (now: Date, base: Timestamp): TimeDistance => {
  try {
    const BASE = base.toDate() as Date;
    const result = formatDistance(now, BASE);

    console.log("````````````result````````````", result);
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

export const getNow = (): Timestamp => Timestamp.now();

export const toTime = (time: Timestamp) => {
  const TIME = time.toDate() as Date;
  const [formatTime, afterTw] = format(TIME, "p").split(" ");

  if (afterTw === "AM") return `오전 ${formatTime}`;
  return `오후 ${formatTime}`;
};
export const toDate = (time: Timestamp) => {
  const TIME = time.toDate() as Date;
  return format(TIME, "MM-dd");
};
export const toYear = (time: Timestamp) => {
  const TIME = time.toDate() as Date;
  return format(TIME, "yyyy-MM-dd");
};

export const toJson = <T>(item: T): string => JSON.stringify(item);
