import { format, formatDistance } from "date-fns";
import { Timestamp } from "firebase/firestore";

type TimeDistance = "today" | "1day" | "days" | "month" | "year" | "error";

export const toTimeDistance = (now: Date, base: Timestamp): TimeDistance => {
  try {
    const BASE = base.toDate() as Date;
    const result = formatDistance(now, BASE);
    if (result.includes("minute")) {
      return "today";
    }

    if (result === "1 day") {
      return "1day";
    }

    if (result.includes("month") || result.includes("months")) {
      return "month";
    }

    if (result.includes("year") || result.includes("years")) {
      return "year";
    }

    return "days";
  } catch (err) {
    return "error";
    console.error(err);
  }
};

export const getNow = (): Timestamp => Timestamp.now();

export const toTime = (time: Timestamp) => {
  const TIME = time.toDate() as Date;
  return format(TIME, "p");
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
