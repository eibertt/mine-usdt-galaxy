const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a la base de datos (Usaremos SQLite por simplicidad inicial)
const db = new sqlite3.Database('./space_miners.db');

// Ruta para ver el saldo de un jugador
app.get('/api/player/:id', (req, res) => {
    const telegramId = req.params.id;
    db.get("SELECT * FROM players WHERE telegram_id = ?", [telegramId], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
});

// Iniciar servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor de Space Miners corriendo en el puerto ${PORT}`);
});
