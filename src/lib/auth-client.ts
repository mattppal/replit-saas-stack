import { createAuthClient } from "better-auth/react";
import { betterFetch } from "@better-fetch/fetch";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  fetch: betterFetch
});

// Export convenience methods
export const {
  useSession,
  signIn,
  signUp,
  signOut,
  updateUser,
  changePassword,
  changeEmail,
  setPassword,
  deleteAccount
} = authClient;