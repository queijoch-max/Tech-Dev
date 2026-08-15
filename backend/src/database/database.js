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

db.exec(`
    CREATE TABLE IF NOT EXISTS project (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        status TEXT NOT NULL,
        progress INTEGER NOT NULL,
        deadline TEXT
    )
`); 

db.exec(`
    CREATE TABLE IF NOT EXISTS event (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        date TEXT NOT NULL,
        time TEXT
    )
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        contenu TEXT NOT NULL,
        date_ajout TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS postIt (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        contenu TEXT NOT NULL,
        color TEXT NOT NULL,
        date_ajout TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )   
`);

export default db;