export const DB_FILENAME = 'chollo_ui.db';

export const DB_CREATE_STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    value TEXT DEFAULT "0",
    defaultVal TEXT DEFAULT "0"
  )`
];

export const sourceKey = Symbol();
export const formatKey = Symbol();