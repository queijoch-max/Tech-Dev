import Database from "better-sqlite3";

const db = new Database("hub.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS task (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        status TEXT NOT NULL,
        period TEXT NOT NULL
    )
`);

export default db;