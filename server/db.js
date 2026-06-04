const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.join(__dirname, 'database.db');

const db = new Database(DB_PATH);

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');

// Create the tasks table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id          INTEGER  PRIMARY KEY AUTOINCREMENT,
    title       TEXT     NOT NULL,
    description TEXT     NULL,
    status      TEXT     DEFAULT 'active' CHECK(status IN ('active', 'completed')),
    due_date    TEXT     NULL,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

console.log(`[DB] Connected to SQLite database at: ${DB_PATH}`);

module.exports = db;