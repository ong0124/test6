import dayjs from "dayjs";
export const formatDate = (date: string | null): string => {
  return date ? dayjs(date).format("YYYY-MM-DD") : "N/A";
};
