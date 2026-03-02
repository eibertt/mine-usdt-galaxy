CREATE TABLE players (
    id INTEGER PRIMARY KEY,
    telegram_id BIGINT UNIQUE,
    username TEXT,
    balance_tcoin REAL DEFAULT 0,
    fuel_level INTEGER DEFAULT 100,
    ship_type TEXT DEFAULT 'Sonda Nano',
    last_mining TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
