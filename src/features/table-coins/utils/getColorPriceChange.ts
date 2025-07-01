export const getColorPriceChange = (priceChange: number): string => {
  const color = priceChange > 0 ? "#43FFC7" : "#FF5252";
  return color;
};
