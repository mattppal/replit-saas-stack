import { betterAuth } from "better-auth";
import { PostgresDialect } from "kysely";
import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const dialect = new PostgresDialect({
    pool,
});

export const auth = betterAuth({
    database: {
        dialect,
        type: "postgres"
    },
    emailAndPassword: {
        enabled: true
    },
    socialProviders: {
        // Add your social providers here if needed
    },
    onError: (error) => {
        console.error('Better Auth Error:', error);
    }
});
