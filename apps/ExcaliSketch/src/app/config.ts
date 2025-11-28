// Next.js automatically loads env vars, so no need for dotenv here
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
export const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:5000";