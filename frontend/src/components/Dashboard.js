import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [points, setPoints] = useState(0);
  const [achievements, setAchievements] = useState([]);

  // Notificación después de 5 minutos de inactividad
  useEffect(() => {
    const inactivityTimeout = setTimeout(() => {
      if (Notification.permission === "granted") {
        new Notification("¡No olvides agregar tus tareas!");
      }
    }, 300000); // 300000ms = 5 minutos

    return () => clearTimeout(inactivityTimeout);
  }, [tasks]);

  // Manejo de agregar tarea, permite agregar tarea con "Enter"
  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask) {
      setTasks([...tasks, { name: newTask, status: 'todo' }]);
      setNewTask('');
    }
  };

  const moveTask = (index, newStatus) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);

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
        <li key={index} className="list-group-item task-item">
          {task.name}
          {status === 'todo' && (
            <Button
              variant="primary"
              size="sm"
              className="float-right task-button"
              onClick={() => moveTask(index, 'in-progress')}
            >
              Iniciar
            </Button>
          )}
          {status === 'in-progress' && (
            <Button
              variant="success"
              size="sm"
              className="float-right task-button"
              onClick={() => moveTask(index, 'completed')}
            >
              Completar
            </Button>
          )}
        </li>
      ));
  };

  // Lógica para calcular el porcentaje de progreso
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const progressPercentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  return (
    <Container className="dashboard-container">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center dashboard-title">Dashboard de Tareas</h2>
          <Form onSubmit={handleAddTask}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Nueva tarea"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="task-input"
              />
              <Button className="w-100 mt-2 task-button" type="submit">
                Agregar Tarea
              </Button>
            </Form.Group>
          </Form>
          <ul className="list-group mt-4 list-horizontal">
            <li className="list-group-item task-link">
              <Link to="/habit-tracker">Seguimiento de Hábitos</Link>
            </li>
            <li className="list-group-item task-link">
              <Link to="/tasks">Tablero de Tareas</Link>
            </li>
            <li className="list-group-item task-link">
              <Link to="/pomodoro">Temporizador Pomodoro</Link>
            </li>
          </ul>
        </Col>
      </Row>

      {/* Barra de progreso */}
      <Row className="justify-content-md-center mt-4">
        <Col md={6}>
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${progressPercentage}%` }}
              aria-valuenow={progressPercentage}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {Math.round(progressPercentage)}%
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mt-4 task-section-container">
        <Col md={4}>
          <h5 className="text-center task-section-title">Por hacer</h5>
          <ul className="list-group">{renderTasks('todo')}</ul>
        </Col>
        <Col md={4}>
          <h5 className="text-center task-section-title">En progreso</h5>
          <ul className="list-group">{renderTasks('in-progress')}</ul>
        </Col>
        <Col md={4}>
          <h5 className="text-center task-section-title">Completadas</h5>
          <ul className="list-group">{renderTasks('completed')}</ul>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={6}>
          <h4 className="text-center task-points">Puntos: {points}</h4>
          <h5 className="text-center task-achievements-title">Logros Desbloqueados:</h5>
          <ul>
            {achievements.map((achievement, index) => (
              <li key={index} className="achievement-item">{achievement}</li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
