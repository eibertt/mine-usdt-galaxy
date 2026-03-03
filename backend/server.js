-- Estructura de la Base de Datos para Space Miners
CREATE TABLE IF NOT EXISTS players (
    id BIGINT PRIMARY KEY,           -- El ID de Telegram del usuario
    name TEXT,                       -- Nombre del jugador
    tcoins FLOAT DEFAULT 0,          -- Saldo de T-Coins acumulados
    usdt FLOAT DEFAULT 0,            -- Saldo de USDT para retiros
    xp INT DEFAULT 0,                -- Experiencia para evolucionar robots
    level INT DEFAULT 1,             -- Nivel actual del robot (1-5)
    last_claim TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ships (
    player_id BIGINT,
    ship_type INT,                   -- 1: Sonda, 5: Imperial Dorada, etc.
    hourly_rate FLOAT,               -- T-Coins que genera por hora
    FOREIGN KEY(player_id) REFERENCES players(id)
);
