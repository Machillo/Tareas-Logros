const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Ruta para registrar usuarios
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  
  // Log para verificar si se recibe la solicitud
  console.log('Datos recibidos en /register:', { email, password });

  try {
    let user = await User.findOne({ email });
    
    // Verificar si el usuario ya existe
    if (user) {
      console.log('El usuario ya existe:', email);
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    // Crear nuevo usuario
    user = new User({
      email,
      password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Log para verificar si el usuario ha sido creado y hasheado
    console.log('Usuario creado con contraseña hasheada:', user);

    await user.save();

    // Log para confirmar que el usuario fue guardado en la base de datos
    console.log('Usuario guardado en la base de datos');

    const payload = {
      user: {
        id: user.id
      }
    };

    // Crear y firmar el token JWT
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;

      // Log para confirmar que el token ha sido generado
      console.log('Token generado');
      res.json({ token });
    });
  } catch (err) {
    // Log para ver el error si ocurre
    console.error('Error en el registro:', err.message);
    res.status(500).send('Error del servidor');
  }
});

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Log para verificar si se recibe la solicitud de login
  console.log('Datos recibidos en /login:', { email, password });

  try {
    let user = await User.findOne({ email });
    
    // Verificar si el usuario existe
    if (!user) {
      console.log('Usuario no encontrado:', email);
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    // Verificar si la contraseña coincide
    if (!isMatch) {
      console.log('Contraseña incorrecta');
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    // Log para confirmar que la contraseña es correcta
    console.log('Contraseña correcta');

    const payload = {
      user: {
        id: user.id
      }
    };

    // Crear y firmar el token JWT
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;

      // Log para confirmar que el token ha sido generado
      console.log('Token generado');
      res.json({ token });
    });
  } catch (err) {
    // Log para ver el error si ocurre
    console.error('Error en el inicio de sesión:', err.message);
    res.status(500).send('Error del servidor');
  }
});

// Ruta protegida para acceder al dashboard
router.get('/dashboard', auth, (req, res) => {
  console.log('Acceso al dashboard concedido para el usuario:', req.user);
  res.json({ msg: 'Bienvenido al dashboard', user: req.user });
});

module.exports = router;
