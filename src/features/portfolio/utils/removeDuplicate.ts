import { PortfolioType, UniqueAsset } from "../types/portfolio";

export const removeDuplicates = (portfolio: PortfolioType): UniqueAsset => {
  return portfolio.reduce((acc, el) => {
    if (acc[el.id]) return acc;

    acc[el.id] = {
      amount: Number(el.amount),
      date: el.date,
    };
    return acc;
  }, {} as UniqueAsset);
};