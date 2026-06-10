// Dishtributer (La Turka platform) public API integration.
// Single source of truth for the API base URL and this venue's public API key.
export const DISHTRIBUTER_API_BASE =
  "https://dishtributer.com/api";
export const DISHTRIBUTER_API_KEY = "dt_7IuEnYlxkPABB3f5TmKXp6qme6CqeNp6";

export const dishtributerHeaders = {
  "Content-Type": "application/json",
  "x-api-key": DISHTRIBUTER_API_KEY,
};
