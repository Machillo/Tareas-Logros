import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [points, setPoints] = useState(0);
  const [achievements, setAchievements] = useState([]);

  const handleAddTask = () => {
    if (newTask) {
      setTasks([...tasks, { name: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleCompleteTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: true } : task
    );
    setTasks(updatedTasks);
    setPoints(points + 10); // Asigna 10 puntos por tarea completada
    checkAchievements(points + 10);
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
            {tasks.map((task, index) => (
              <li
                key={index}
                className={`list-group-item ${
                  task.completed ? 'list-group-item-success' : ''
                }`}
              >
                {task.name}
                {!task.completed && (
                  <Button
                    className="float-right"
                    variant="success"
                    size="sm"
                    onClick={() => handleCompleteTask(index)}
                  >
                    Completar
                  </Button>
                )}
              </li>
            ))}
          </ul>
          <h4 className="mt-4">Puntos: {points}</h4>
          <h5 className="mt-4">Logros Desbloqueados:</h5>
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


