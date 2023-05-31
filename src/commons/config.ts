import dayjs from "dayjs";
import { isToday } from "./utils";
export const formatDate = (dayjs: dayjs.Dayjs) => {
  return dayjs.format("DD/MM/YYYY HH:mm:ss");
};

export const disableToCurrentTime = (
  date: dayjs.Dayjs | null
): {
  disabledHours?: () => number[];
  disabledMinutes?: (hour: number) => number[];
  disabledSeconds?: (hour: number, minute: number) => number[];
} => {
  if (date && isToday(date)) {
    return {
      disabledHours: () => Array.from({ length: dayjs().hour() }, (v, i) => i),
      disabledMinutes: (hour: number) => {
        if (hour === dayjs().hour()) {
          return Array.from({ length: dayjs().minute() }, (v, i) => i);
        }
        return [];
      },
    };
  }
  return {};
};

export const quillConfig = {
  toolbar: [
    [{ font: [] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ],
};
