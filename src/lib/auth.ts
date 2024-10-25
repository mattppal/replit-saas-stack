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
        // Add your social providers here, for example:
        // github: { 
        //   clientId: process.env.GITHUB_CLIENT_ID, 
        //   clientSecret: process.env.GITHUB_CLIENT_SECRET, 
        // } 
    },
});
