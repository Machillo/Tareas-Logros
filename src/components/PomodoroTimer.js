import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            if (isBreak) {
              setMinutes(25); // Volver al ciclo de trabajo
              setIsBreak(false);
            } else {
              setMinutes(5); // Iniciar el descanso
              setIsBreak(true);
            }
            setSeconds(0);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else if (!isActive && minutes !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setMinutes(25);
    setSeconds(0);
    setIsActive(false);
    setIsBreak(false);
  };

  return (
    <Container className="text-center">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>Temporizador Pomodoro</h2>
          <div style={{ fontSize: '48px', margin: '20px' }}>
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </div>
          <Button onClick={toggleTimer} className="m-2">
            {isActive ? 'Pausar' : 'Iniciar'}
          </Button>
          <Button onClick={resetTimer} className="m-2" variant="danger">
            Reiniciar
          </Button>
          <h4>{isBreak ? 'Descanso' : 'Trabajo'}</h4>
        </Col>
      </Row>
    </Container>
  );
};

export default PomodoroTimer;
