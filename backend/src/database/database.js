import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

const initDb = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS task (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT,
            status TEXT NOT NULL,
            period TEXT NOT NULL
        )
    `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS project (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            description TEXT,
            status TEXT NOT NULL,
            progress INTEGER NOT NULL,
            deadline TEXT
        )
    `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS event (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT,
            date TEXT NOT NULL,
            time TEXT
        )
    `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS notes (
            id SERIAL PRIMARY KEY,
            contenu TEXT NOT NULL,
            date_ajout TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS postit (
            id SERIAL PRIMARY KEY,
            contenu TEXT NOT NULL,
            color TEXT NOT NULL,
            date_ajout TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email TEXT NOT NULL,
            password TEXT NOT NULL
        )
    `);
};

await initDb();

export default pool;
