export const formatAmountUnit = (amount: number | null): string => {
  if (!amount || isNaN(amount)) {
    throw new Error("Invalid input: amount must be a valid number.");
  }

  const absAmount = Math.abs(amount);

  if (absAmount >= 1_000_000_000) {
    return `${(amount / 1_000_000_000).toFixed(3)} bln`;
  }

  if (absAmount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(3)} mln`;
  }

  return amount.toFixed(3);
};

export const formatAmount = (amount: number | null): string => {
  if (!amount || isNaN(amount)) {
    throw new Error("Invalid input: amount must be a valid number.");
  }

  const absAmount = Math.abs(amount);

  if (absAmount >= 1_000_000_000) {
    return `${(amount / 1_000_000_000).toFixed(3)} `;
  }

  if (absAmount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(3)} `;
  }

  return amount.toFixed(3);
};
