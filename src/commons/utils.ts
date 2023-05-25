import dayjs from "dayjs";
export const formatDate = (dayjs: dayjs.Dayjs) => {
  return dayjs.format("DD/MM/YYYY HH:mm:ss");
};
