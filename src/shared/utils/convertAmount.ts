export const convertAmount = (
  amount: number,
  conversionRate: number | undefined
): number | null => {
  if (
    typeof conversionRate === "undefined" ||
    isNaN(amount) ||
    isNaN(conversionRate)
  ) {
    return null;
  }

  return amount * conversionRate;
};