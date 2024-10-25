import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL
})

// You can also export specific methods if you prefer:
export const { signIn, signUp, useSession } = authClient;
