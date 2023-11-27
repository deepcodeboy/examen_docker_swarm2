const express = require('express');
const mysql = require('mysql2/promise');
const morgan = require('morgan')
const cors = require('cors')

const app = express();

const pool = mysql.createPool({
    host: 'mysql',
    user: 'root',
    password: 'root',
    database: 'examenDocker',
});

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.post('/insertar_con_rest', async (req, res) => {
    try {
        const { apellidos, nombres, dni } = req.body;
        console.log(req.body)
        const [rows] = await pool.query(
            "INSERT INTO usuarios (apellidos, nombres, dni) VALUES (?, ?, ?)",
            [apellidos, nombres, dni]
        );
        res.json({
            msg: 'Insertado correctamente',
            id: rows.insertId,
            apellidos,
            nombres,
            dni
        });
    } catch (error) {
        return res.json({ msg: "Algo salio mal", error });
    }
});

app.get('/obtener_con_rest', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM usuarios");
        console.log(rows)
        res.json({ok:true, msg: "Personas:", rows });
    } catch (error) {
        console.log(error)
        return res.json({ msg: "Algo salio mal" });
        
    }
});

app.listen(8080, () => {
    console.log(`Servidor en funcionamiento en el puerto 8080`);
});
