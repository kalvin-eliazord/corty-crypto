export const getSparklineStrokeColor = (sparklinePrice: number[]) => {
  return sparklinePrice[sparklinePrice.length - 8] < sparklinePrice[sparklinePrice.length - 1]
    ? "#43FFC7"
    : "#FF5252";
};
