// backend/database.js
const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = 'db.sqlite';

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log('Connected to the SQLite database.');

    db.run(`CREATE TABLE IF NOT EXISTS produk (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      barcode TEXT UNIQUE,
      name TEXT,
      category TEXT,
      hpp REAL,
      selling_price REAL,
      quantity INTEGER
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS stock_transaction (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT,
      customer_resi TEXT,
      barcode TEXT,
      quantity INTEGER,
      FOREIGN KEY(barcode) REFERENCES produk(barcode)
    )`, (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log('Tables are ready');
      }
    });
    db.run(`CREATE TABLE IF NOT EXISTS stock_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      barcode TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      FOREIGN KEY (barcode) REFERENCES produk(barcode)
);`, (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log('Tables are ready');
      }
    });
    db.run(`CREATE TABLE IF NOT EXISTS stockout_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      customer_resi TEXT NOT NULL,
      barcode TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      FOREIGN KEY (barcode) REFERENCES produk(barcode)
);`, (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log('Tables are ready');
      }
    });
    
  }
});

module.exports = db;
