import { d as dayjs } from '../_/index.mjs';

const formatDate = (date) => {
  return date ? dayjs(date).format("YYYY-MM-DD") : null;
};
function formatTime(time) {
  if (!time) return null;
  const withSeconds = dayjs(time, "HH:mm:ss", true);
  if (withSeconds.isValid()) {
    return withSeconds;
  }
  const withoutSeconds = dayjs(time, "HH:mm", true);
  if (withoutSeconds.isValid()) {
    return withoutSeconds;
  }
  return null;
}
function displayTime(time) {
  return time ? time.format("HH:mm") : "";
}

export { formatDate as a, displayTime as d, formatTime as f };
//# sourceMappingURL=formatDate.mjs.map
