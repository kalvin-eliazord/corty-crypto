export const formatAmountUnit = (amount: number | null | undefined): string  => {
  if (!amount || isNaN(amount)) {
    console.warn("Invalid input: amount must be a valid number.");
    return "";
  }

  const absAmount = Math.abs(amount);

  let unit = "";
  let scaledAmount = 0;

  if (absAmount >= 1_000_000_000) {
    scaledAmount = amount / 1_000_000_000;
    unit = "bln";
  } else if (absAmount >= 1_000_000) {
    scaledAmount = amount / 1_000_000;
    unit = "mln";
  } else if (absAmount >= 1_000) {
    scaledAmount = amount / 1_000;
    unit = "k";
  } else {
    scaledAmount = amount;
    unit = "";
  }

  return (
    new Intl.NumberFormat(navigator.language).format(scaledAmount) + " " + unit
  );
};

export const formatAmount = (
  amount: number | null | undefined
): string => {
  if (!amount || isNaN(amount)) {
    console.warn("Invalid input: amount must be a valid number.");
    return "";
  }

  return new Intl.NumberFormat(navigator.language).format(amount);
};
