import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        //Envio de formulario
        console.log('Email:', email, 'Password:', password);
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={4}>
                <h2 className='text-center'>Iniciar Sesión</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}></Form.control>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                         Iniciar Sesión
                    </Button>
                </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;