import { d as dayjs } from '../_/index.mjs';

const formatDate = (date) => {
  return date ? dayjs(date).format("YYYY-MM-DD") : "N/A";
};

export { formatDate as f };
//# sourceMappingURL=formatDate.mjs.map
