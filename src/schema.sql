CREATE TABLE IF NOT EXIST weather_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    city TEXT NOT NULL,
    temperature REAL, 
    windspeed REAL, 
    fetched_at timestamp DEFAULT CURRENT_TIMESTAMP);   