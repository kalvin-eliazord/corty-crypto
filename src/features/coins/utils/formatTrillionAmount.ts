export const formatTrillionAmount = (trillionAmount: number): string => {
  if (!trillionAmount || isNaN(trillionAmount)) {
    console.warn("Insert valid amount number.");

    return "0 T";
  }

  const formattedAmount = (trillionAmount / 1e12).toFixed(2);
  return `${formattedAmount} T`;
};
