import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// Create API route handler for auth endpoints
export const { GET, POST } = toNextJsHandler(auth);