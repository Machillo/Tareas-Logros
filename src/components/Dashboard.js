import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
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
    </Container>
  );
};

export default Dashboard;
