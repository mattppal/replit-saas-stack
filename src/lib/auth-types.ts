export interface Session {
    user: {
        id: string
        email: string
        name?: string
    }
    expires: string
} 