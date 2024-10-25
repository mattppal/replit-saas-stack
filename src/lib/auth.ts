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
    onError: (error: Error) => {
        console.error('Better Auth Error:', error);
        console.error('Database URL:', process.env.DATABASE_URL); // Add this line
    }
});

// Add this section to test the database connection
pool.connect((err, client, release) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Successfully connected to the database');
        release();
    }
});
