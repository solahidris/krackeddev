
import postgres from 'postgres';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.error("❌ DATABASE_URL is not defined in environment variables.");
    process.exit(1);
}

const sql = postgres(connectionString);

async function runMigrations() {
    console.log("🚀 Starting Supabase Setup Migration...");

    const migrationsDir = path.join(__dirname, '../supabase/migrations');

    try {
        // 1. Get all SQL files
        const files = fs.readdirSync(migrationsDir)
            .filter(f => f.endsWith('.sql'))
            .sort(); // Ensure order (001, 002, etc.)

        if (files.length === 0) {
            console.log("⚠️ No migration files found in supabase/migrations/");
            return;
        }

        console.log(`Found ${files.length} migration files.`);

        // 2. Execute each file
        for (const file of files) {
            const filePath = path.join(migrationsDir, file);
            const content = fs.readFileSync(filePath, 'utf8');

            console.log(`\n📄 Executing: ${file}`);

            try {
                // We use unsafe because we are running raw SQL files which might contain multiple statements
                await sql.unsafe(content);
                console.log(`✅ Success: ${file}`);
            } catch (err) {
                console.error(`❌ Error executing ${file}:`, err);
                // We don't exit here to allow attempting other independent migrations, 
                // asking user to check manually if something fails.
                // OR better to fail fast? Usually fail fast is safer.
                // But for "setup", maybe some already exist.
                // Let's log and rethrow to stop.
                throw err;
            }
        }

        console.log("\n✨ All Supabase migrations completed successfully!");

    } catch (error) {
        console.error("\n❌ Setup failed:", error);
        process.exit(1);
    } finally {
        await sql.end();
    }
}

runMigrations();
