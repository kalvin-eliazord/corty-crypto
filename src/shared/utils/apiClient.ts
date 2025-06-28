import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.coingecko.com/api/v3/",
  timeout: 5_000,
});

export default apiClient;
