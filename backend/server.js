const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config(); 

// Conectar a la base de datos
connectDB();

const app = express();

// Middleware para manejar JSON
app.use(express.json()); // Asegúrate de tener esto

// Definir las rutas
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
