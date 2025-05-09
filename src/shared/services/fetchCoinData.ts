import { api } from "@/shared/services/apiConfig";

export const fetchCoinData = async (url: string) => {
  const data = api.get(url);
  return data;
};
