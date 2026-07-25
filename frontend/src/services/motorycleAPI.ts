import axios from "axios";
import type { Motorcycle, SearchFormData } from "../interface/MotoInterface";

const URL_BASE_API_DEV = import.meta.env.VITE_URL_BASE_API_DEV;

export const getMotoSpecs = async ({
  make,
  model,
  year,
}:SearchFormData): Promise<Motorcycle> => {
  if (!URL_BASE_API_DEV) {
    throw new Error("URL_BASE_API_DEV is not configured");
  }

  const response = await axios.get<Motorcycle>(
    `${URL_BASE_API_DEV}/api/motorcycles/lookup_motorcycle`,
    { params: { make: make, model: model, year: year } },
  );

  return response.data;
};
