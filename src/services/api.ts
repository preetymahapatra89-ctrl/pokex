import { ENV } from "../config/env";
const API_BASE_URL = ENV.API_BASE_URL;

export async function apiGet<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}
