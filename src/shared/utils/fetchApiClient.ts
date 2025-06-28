import apiClient from "./apiClient";

export const fetchApiClient = async <T>(url: string): Promise<T> => {
  try {
    const { data } = await apiClient.get(url);
    return data;
  } catch (error) {
    console.log("error Api client: ", error);
    throw error;
  }
};
