const sqlite3 = require('sqlite3').verbose();

// Create the SQLite database in memory
const db = new sqlite3.Database(':memory:');

// Define the schema and create tables
db.serialize(() => {
  // Users table
  db.run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);

  // Translations table with foreign key reference to users table
  db.run(`
    CREATE TABLE translations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      language TEXT,
      originalText TEXT,
      correctedText TEXT,
      translatedText TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      user_id INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
});

module.exports = {
  db,
};
