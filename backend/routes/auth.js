const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Ruta para registrar usuarios
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
  
    console.log("Datos recibidos:", req.body); // Para verificar lo que llega
  
    try {
      // Verificar si el usuario ya existe
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'El usuario ya existe' });
      }
  
      // Crear nuevo usuario
      user = new User({
        email,
        password
      });
  
      // Hashear la contraseña antes de guardarla
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
  
      // Guardar el usuario en la base de datos
      await user.save();
  
      // Crear y firmar el token JWT
      const payload = {
        user: {
          id: user.id
        }
      };
  
      jwt.sign(
        payload,
        process.env.JWT_SECRET, // Asegúrate de que JWT_SECRET está definido en el archivo .env
        { expiresIn: 360000 }, // Expiración del token
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error del servidor');
    }
  });
  
  // Ruta para iniciar sesión
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Verificar si el usuario existe
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Credenciales inválidas' });
      }
  
      // Verificar la contraseña
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Credenciales inválidas' });
      }
  
      // Crear y firmar el token JWT
      const payload = {
        user: {
          id: user.id
        }
      };
  
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error del servidor');
    }
  });
  

module.exports = router;
