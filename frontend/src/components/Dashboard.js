import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [points, setPoints] = useState(0);
  const [achievements, setAchievements] = useState([]);

  // Obtener las tareas del backend cuando se carga el componente
  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/tasks', {
        headers: {
          'x-auth-token': token
        }
      });
      setTasks(res.data.tasks);
      setPoints(res.data.points);
      setAchievements(res.data.achievements);
    };

    fetchTasks();
  }, []);

  // Notificación después de 5 minutos de inactividad
  useEffect(() => {
    const inactivityTimeout = setTimeout(() => {
      if (Notification.permission === "granted") {
        new Notification("¡No olvides agregar tus tareas!");
      }
    }, 300000); // 300000ms = 5 minutos

    return () => clearTimeout(inactivityTimeout); // Limpiar timeout cuando el componente se desmonta o actualiza
  }, [tasks]);

  // Manejo de agregar tarea
  const handleAddTask = async () => {
    const token = localStorage.getItem('token');
    if (newTask) {
      const res = await axios.post('http://localhost:5000/api/tasks', { name: newTask }, {
        headers: {
          'x-auth-token': token
        }
      });
      setTasks([...tasks, res.data.task]);
      setNewTask('');
    }
  };

  const moveTask = async (index, newStatus) => {
    const token = localStorage.getItem('token');
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);

    // Actualizar el estado en el backend
    await axios.put(`http://localhost:5000/api/tasks/${tasks[index]._id}`, { status: newStatus }, {
      headers: {
        'x-auth-token': token
      }
    });

    if (newStatus === 'completed') {
      setPoints(points + 10); // Sumar 10 puntos por cada tarea completada
      checkAchievements(points + 10); // Verificar si se desbloquean logros
    }
  };

  const checkAchievements = (newPoints) => {
    const newAchievements = [];
    if (newPoints >= 50 && !achievements.includes('Primer logro: 50 puntos')) {
      newAchievements.push('Primer logro: 50 puntos');
    }
    if (newPoints >= 100 && !achievements.includes('Segundo logro: 100 puntos')) {
      newAchievements.push('Segundo logro: 100 puntos');
    }
    setAchievements([...achievements, ...newAchievements]);
  };

  const renderTasks = (status) => {
    return tasks
      .filter((task) => task.status === status)
      .map((task, index) => (
        <li key={index} className="list-group-item">
          {task.name}
          {status === 'todo' && (
            <Button
              variant="primary"
              size="sm"
              className="float-right"
              onClick={() => moveTask(index, 'in-progress')}
            >
              Iniciar
            </Button>
          )}
          {status === 'in-progress' && (
            <Button
              variant="success"
              size="sm"
              className="float-right"
              onClick={() => moveTask(index, 'completed')}
            >
              Completar
            </Button>
          )}
        </li>
      ));
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center">Dashboard de Tareas</h2>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Nueva tarea"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <Button className="w-100 mt-2" onClick={handleAddTask}>
              Agregar Tarea
            </Button>
          </Form.Group>
          <ul className="list-group mt-4">
            <li className="list-group-item">
              <Link to="/habit-tracker">Ir al Seguimiento de Hábitos</Link>
            </li>
            <li className="list-group-item">
              <Link to="/tasks">Tablero de Tareas</Link>
            </li>
            <li className="list-group-item">
              <Link to="/pomodoro">Temporizador Pomodoro</Link>
            </li>
          </ul>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={4}>
          <h5 className="text-center">Por hacer</h5>
          <ul className="list-group">{renderTasks('todo')}</ul>
        </Col>
        <Col md={4}>
          <h5 className="text-center">En progreso</h5>
          <ul className="list-group">{renderTasks('in-progress')}</ul>
        </Col>
        <Col md={4}>
          <h5 className="text-center">Completadas</h5>
          <ul className="list-group">{renderTasks('completed')}</ul>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={6}>
          <h4 className="text-center">Puntos: {points}</h4>
          <h5 className="text-center">Logros Desbloqueados:</h5>
          <ul>
            {achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
