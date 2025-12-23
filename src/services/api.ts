const API_BASE_URL = "https://pokeapi.co/api/v2";

export async function apiGet<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}
