export const getPercentage = (count: number, total: number) => {
  if (total > 0) return Math.round((count / total) * 100);
  return 0;
};
