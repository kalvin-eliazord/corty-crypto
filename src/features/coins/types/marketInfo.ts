export type MarketInfo = {
    data: {
      active_cryptocurrencies: number;
      markets: number;
      total_market_cap: {
        [key: string]: number;
      };
      total_volume: {
        [key: string]: number;
      };
      market_cap_percentage: {
        [key: string]: number;
      };
    };
  };
  
  export type MarketItemProps = {
    data: string | number;
    name?: string | null;
    Icon?: React.ElementType;
    progressBarColor?: string;
    isVerticalHeaderLine: boolean;
  };