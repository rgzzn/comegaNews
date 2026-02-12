export const DEFAULT_IMAGE = "https://picsum.photos/1920/1080?blur=2";

// Environment variable fallbacks
// Access env through 'any' cast to avoid TypeScript errors if types are missing
const env = (import.meta as any).env || {};

export const REFRESH_INTERVAL_MS = (env.VITE_REFRESH_MINUTES ? parseInt(env.VITE_REFRESH_MINUTES) : 15) * 60 * 1000;
export const MAIN_ROTATE_MS = (env.VITE_MAIN_ROTATE_SECONDS ? parseInt(env.VITE_MAIN_ROTATE_SECONDS) : 25) * 1000;
export const SECONDARY_ROTATE_MS = 35 * 1000; // Time to page through secondary items

// Items per view
export const SECONDARY_ITEMS_COUNT = 3; 

// Proxy for CORS (Using AllOrigins for demo/client-side stability)
export const CORS_PROXY = "https://api.allorigins.win/get?url=";