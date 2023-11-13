const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const port = 8080;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

// Configuración de la conexión a la base de datos
const pool = mysql.createPool({
    connectionLimit : 10,
    host: 'database',
    user: 'root',
    password: '1234',
    database: 'examenDocker'
});

// Intentar conectar a la base de datos al iniciar el servidor
pool.getConnection((err, connection) => {
    if (err) {
        console.error("Error conectando a la base de datos:", err.message);
    } else {
        console.log("Conectado con éxito a la base de datos");
        connection.release(); // Liberar la conexión
    }
});

// Ruta POST para insertar una persona
app.post('/insertar_con_rest', (req, res) => {
    const { apellidos, nombres, dni } = req.body;
    pool.query(
        'INSERT INTO personas (apellidos, nombres, dni) VALUES (?, ?, ?)',
        [apellidos, nombres, dni],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            res.status(201).json({ id: results.insertId, apellidos, nombres, dni });
        }
    );
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
