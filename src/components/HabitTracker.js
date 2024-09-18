import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

const HabitTracker = () => {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');

  const addHabit = () => {
    if (newHabit) {
      setHabits([...habits, { name: newHabit, completed: false }]);
      setNewHabit('');
    }
  };

  const toggleHabitCompletion = (index) => {
    const updatedHabits = habits.map((habit, i) =>
      i === index ? { ...habit, completed: !habit.completed } : habit
    );
    setHabits(updatedHabits);
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center">Seguimiento de Hábitos</h2>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Nuevo hábito"
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
            />
            <Button className="w-100 mt-2" onClick={addHabit}>
              Agregar Hábito
            </Button>
          </Form.Group>
          <ul className="list-group mt-4">
            {habits.map((habit, index) => (
              <li
                key={index}
                className={`list-group-item ${
                  habit.completed ? 'list-group-item-success' : ''
                }`}
              >
                {habit.name}
                <Button
                  className="float-right"
                  variant={habit.completed ? 'danger' : 'success'}
                  size="sm"
                  onClick={() => toggleHabitCompletion(index)}
                >
                  {habit.completed ? 'Desmarcar' : 'Completar'}
                </Button>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default HabitTracker;
