import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import HabitTracker from './components/HabitTracker';
import PomodoroTimer from './components/PomodoroTimer';

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
        {/* Aquí quitamos el PrivateRoute temporalmente */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/habit-tracker" element={<HabitTracker />} />
        <Route path="/pomodoro" element={<PomodoroTimer />} />
      </Routes>
    </Router>
  );
}

export default App;

