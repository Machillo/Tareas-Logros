const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');  // Importa el middleware CORS
require('dotenv').config(); 

// Conectar a la base de datos
connectDB();

const app = express();

// Configura CORS para permitir solicitudes desde el frontend
app.use(cors({
  origin: 'http://localhost:3000',  // Permite solicitudes desde este origen
  credentials: true,
}));

// Middleware para manejar JSON
app.use(express.json());

// Definir las rutas
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
