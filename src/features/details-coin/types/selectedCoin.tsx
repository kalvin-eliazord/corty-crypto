interface CurrencyValues {
  [currency: string]: number;
}

interface PlatformDetails {
  decimal_place: number;
  contract_address: string;
}

interface Description {
  en: string;
}

interface Links {
  homepage: string[];
  whitepaper: string;
  blockchain_site: string[];
  official_forum_url: string[];
  chat_url: string[];
  announcement_url: string[];
  snapshot_url: string | null;
  twitter_screen_name: string;
  facebook_username: string;
  bitcointalk_thread_identifier: number | null;
  telegram_channel_identifier: string;
  subreddit_url: string;
  repos_url: {
    github: string[];
    bitbucket: string[];
  };
}

interface Image {
  thumb: string;
  small: string;
  large: string;
}

interface roi {
  times: number;
  currency: string;
  percentage: number;
}

export interface HourlyPrice {
  price: number[];
}

interface MarketData {
  current_price: CurrencyValues;
  total_value_locked: number | null;
  mcap_to_tvl_ratio: number | null;
  fdv_to_tvl_ratio: number | null;
  roi: roi | null;
  ath: CurrencyValues;
  ath_change_percentage: CurrencyValues;
  ath_date: Record<string, string>;
  atl: CurrencyValues;
  atl_change_percentage: CurrencyValues;
  atl_date: Record<string, string>;
  market_cap: CurrencyValues;
  market_cap_rank: number;
  fully_diluted_valuation: CurrencyValues;
  market_cap_fdv_ratio: number;
  total_volume: CurrencyValues;
  high_24h: CurrencyValues;
  low_24h: CurrencyValues;
  price_change_24h: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  price_change_percentage_14d: number;
  price_change_percentage_30d: number;
  price_change_percentage_60d: number;
  price_change_percentage_200d: number;
  price_change_percentage_1y: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  price_change_24h_in_currency: CurrencyValues;
  price_change_percentage_1h_in_currency: CurrencyValues;
  price_change_percentage_24h_in_currency: CurrencyValues;
  price_change_percentage_7d_in_currency: CurrencyValues;
  price_change_percentage_14d_in_currency: CurrencyValues;
  price_change_percentage_30d_in_currency: CurrencyValues;
  price_change_percentage_60d_in_currency: CurrencyValues;
  price_change_percentage_200d_in_currency: CurrencyValues;
  price_change_percentage_1y_in_currency: CurrencyValues;
  market_cap_change_24h_in_currency: CurrencyValues;
  market_cap_change_percentage_24h_in_currency: CurrencyValues;
  total_supply: number;
  max_supply: number | null;
  max_supply_infinite: boolean;
  circulating_supply: number;
  sparkline_7d: HourlyPrice;
  last_updated: string;
}

interface CommunityData {
  facebook_likes: number | null;
  reddit_average_posts_48h: number;
  reddit_average_comments_48h: number;
  reddit_subscribers: number;
  reddit_accounts_active_48h: number;
  telegram_channel_user_count: number;
}

export interface Cryptocurrency {
  id: string;
  symbol: string;
  name: string;
  web_slug: string;
  asset_platform_id: string;
  platforms: Record<string, string>;
  detail_platforms: Record<string, PlatformDetails>;
  block_time_in_minutes: number;
  hashing_algorithm: string | null;
  categories: string[];
  preview_listing: boolean;
  public_notice: string | null;
  additional_notices: string[];
  description: Description;
  links: Links;
  image: Image;
  country_origin: string;
  genesis_date: string | null;
  contract_address: string;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
  watchlist_portfolio_users: number;
  market_cap_rank: number;
  market_data: MarketData;
  community_data: CommunityData;
  status_updates: string[];
  last_updated: string;
}
