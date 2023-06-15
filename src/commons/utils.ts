import dayjs from "dayjs";
export const formatDate = (dayjs: dayjs.Dayjs) => {
  return dayjs.format("DD/MM/YYYY HH:mm:ss");
};

export const isToday = (date?: dayjs.Dayjs) => {
  return date?.format("DD/MM/YYYY") == dayjs().format("DD/MM/YYYY");
};

export function timeSince(date: dayjs.Dayjs) {
  var seconds = Math.floor((dayjs().valueOf() - date.valueOf()) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return date.format("HH:mm DD/MM/YYYY");
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return date.format("HH:mm DD/MM/YYYY");
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " ngày trước";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " giờ trước";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " phút trước";
  }
  return "vài giây trước";
}

export const formatCurrency = (currency?: number) => {
  return currency?.toLocaleString("vi", { style: "currency", currency: "VND" });
};

export const jsonParseUtil = (json?: string | null) => {
  if (!json) {
    return undefined;
  }
  return JSON.parse(json);
};

export const customParamsSerializer = (params: any) => {
  return Object.entries(params)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map((v) => `${key}=${v}`).join("&");
      }
      if (!value) {
        return;
      }
      return `${key}=${value}`;
    })
    .join("&");
};
