const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

let db;

if (process.env.VERCEL) {
  const { neon } = require("@neondatabase/serverless");
  const sql = neon(process.env.DATABASE_URL);

  // Convert ? placeholders to $1, $2, ... for PostgreSQL
  function convertParams(query, params) {
    let idx = 0;
    const text = query.replace(/\?/g, () => `$${++idx}`);
    return { text, params };
  }

  db = {
    all: async (query, params = []) => {
      const { text, params: args } = convertParams(query, params);
      return await sql(text, args);
    },
    get: async (query, params = []) => {
      const { text, params: args } = convertParams(query, params);
      const rows = await sql(text, args);
      return rows[0] || null;
    },
    run: async (query, params = []) => {
      const isInsert = query.trim().toUpperCase().startsWith("INSERT");
      let finalQuery = query;
      if (isInsert && !query.toUpperCase().includes("RETURNING")) {
        finalQuery = query + " RETURNING id";
      }
      const { text, params: args } = convertParams(finalQuery, params);
      const rows = await sql(text, args);
      return { lastID: rows[0]?.id || null, changes: rows.length };
    },
    exec: async (query) => {
      const { text } = convertParams(query, []);
      await sql(text);
    },
  };
} else {
  const Database = require("better-sqlite3");
  const dbPath = process.env.DB_PATH || "./database.sqlite";
  const sqliteDb = new Database(path.join(__dirname, dbPath));
  sqliteDb.pragma("journal_mode = WAL");
  sqliteDb.pragma("foreign_keys = ON");

  db = {
    all: (query, params = []) =>
      Promise.resolve(sqliteDb.prepare(query).all(...params)),
    get: (query, params = []) =>
      Promise.resolve(sqliteDb.prepare(query).get(...params)),
    run: (query, params = []) => {
      const stmt = sqliteDb.prepare(query);
      const result = stmt.run(...params);
      return Promise.resolve({
        lastID: result.lastInsertRowid,
        changes: result.changes,
      });
    },
    exec: (query) => Promise.resolve(sqliteDb.exec(query)),
  };
}

module.exports = db;
