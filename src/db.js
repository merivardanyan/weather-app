const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '../weather.db'));
db.run(`
    CREATE TABLE IF NOT EXISTS weather_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    city TEXT NOT NULL,
    temperature REAL, 
    windspeed REAL, 
    fetched_at timestamp DEFAULT CURRENT_TIMESTAMP);   
    `)

module.exports = db;