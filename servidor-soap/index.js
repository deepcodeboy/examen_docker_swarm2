const express = require('express');
const soap = require('soap');
const cors = require('cors');
const morgan = require('morgan');
const mysql = require('mysql2/promise');
const { readFileSync } = require('fs');

const app = express();
const port = 8888;

app.use(cors());
app.use(morgan('combined'));

// Configuración de la conexión a la base de datos
const dbConnInfo = {
  database: 'examenDocker',
  user: 'root',
  password: '1234',
  host: 'database',
};

// Crear una conexión a la base de datos
const pool = mysql.createPool(dbConnInfo);

// Función para consultar personas
const consultarPersonas = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM personas');
    return rows;
  } catch (error) {
    throw error;
  }
};

const soapService = {
  ConsultarPersonasService: {
    ConsultarPersonasPort: {
      consultarPersonas: async (args, callback) => {
        try {
          const personas = await consultarPersonas();
          console.log(personas);
          callback(null, { result: personas });
        } catch (error) {
          console.error('Error en la consulta SOAP: ', error.message);
          callback(error, null);
        }
      },
    },
  },
};

app.listen(port, () => {
  console.log(`Servidor SOAP escuchando en el puerto ${port}`);
});

const xml = readFileSync('./consultarPersonas.wsdl', 'utf8');

soap.listen(app, '/consultar_con_soap', soapService, xml, (err, res) => {
  console.log(`SOAP en ${res.path}`);
});
