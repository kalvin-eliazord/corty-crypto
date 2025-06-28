export const getPurchasedPriceChange = (
  oldPrice: string,
  currentPrice: number
): number => {
  if (!oldPrice || !currentPrice) return 0;

  return ((currentPrice - parseFloat(oldPrice)) / parseFloat(oldPrice)) * 100;
};