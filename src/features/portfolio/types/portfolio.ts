import { CoinType } from "@/shared/types/coins";

export type Asset = {
  id: string;
  amount: number;
  date: string;
  totalCost?: number;
};

export type PortfolioType = Asset[];

export type FinalizedAsset = {
  [key: string]: {
    id: string;
    amount: number;
    date: string;
    totalCost: number;
  } & Partial<CoinType>;
};

export type PricePerDateAsset = Asset & Partial<CoinType>;

export type UniqueAsset = {
  [key: string]: {
    amount: number;
    date: string;
    totalCost: number;
  };
};
