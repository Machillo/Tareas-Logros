import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import HabitTracker from './components/HabitTracker';
import PomodoroTimer from './components/PomodoroTimer';
import PrivateRoute from './components/PrivateRoute'; // Solo importa el PrivateRoute

function App() {
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission()
        .then(permission => {
          if (permission === "granted") {
            console.log("Permiso de notificaciones concedido");
          }
        });
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/habit-tracker" element={<PrivateRoute><HabitTracker /></PrivateRoute>} />
        <Route path="/pomodoro" element={<PrivateRoute><PomodoroTimer /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
