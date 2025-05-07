import axios from "axios";

const getError = (err: unknown): string => {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.message || err.message;
  }

  if (err instanceof Error) {
    return err.message;
  }

  return String(err);
};

export default getError;
