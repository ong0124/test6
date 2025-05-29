import dayjs from "dayjs";
export const formatDate = (date: string | null): string | null => {
  return date ? dayjs(date).format("YYYY-MM-DD") : null;
};


export function formatTime(time?: string | null): dayjs.Dayjs | null {
  if (!time) return null;

  const withSeconds = dayjs(time, 'HH:mm:ss', true);
  if (withSeconds.isValid()) {
    return withSeconds;
  }

  const withoutSeconds = dayjs(time, 'HH:mm', true);
  if (withoutSeconds.isValid()) {
    return withoutSeconds;
  }

  return null;
}

export function displayTime(time?: dayjs.Dayjs | null): string {
  return time ? time.format('HH:mm') : '';
}