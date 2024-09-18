import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask) {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
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
              <li key={index} className="list-group-item">
                {task}
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
