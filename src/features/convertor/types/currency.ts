export type CurrencyInfo = {
    name: string;
    unit: string;
    value: number;
    type: "crypto" | "fiat" | "commodity";
  };