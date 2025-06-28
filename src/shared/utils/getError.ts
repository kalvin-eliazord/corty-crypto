import axios from "axios";

const getError = (err: unknown): string => {
  if (axios.isAxiosError(err)) {
    if (err.response) {
      // Server responded with a status code outside 2xx
      const status = err.response.status;
      const message =
        err.response.data?.message || err.response.statusText || "Error";
      return `Error ${status}: ${message}`;
    } else if (err.request) {
      // Request was made but no response received
      return "Network Error: No response received from server";
    } else {
      // Something happened setting up the request
      return err.message;
    }
  }

  if (err instanceof Error) {
    return err.message;
  }

  return String(err);
};

export default getError;
