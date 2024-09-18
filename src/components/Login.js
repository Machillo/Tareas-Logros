import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email, 'Password:', password);
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={4}>
          <h2 className="text-center">Iniciar Sesión</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Link to="/dashboard">
              <Button variant="primary" className="w-100" type="submit">
                Iniciar Sesión
              </Button>
            </Link>
          </Form>
          <p className="text-center mt-3">
            ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
