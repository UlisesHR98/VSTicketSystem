import React from 'react';
import { useSpring, animated } from 'react-spring';
import './LoadingScreenComponent.css'; // Archivo CSS para estilos

const LoadingScreen = () => {
  const animationProps = useSpring({
    from: { opacity: 0, transform: 'translateY(-100%)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 200, friction: 20 }, // Configuración de la animación
  });

  return (
    <animated.div style={animationProps} className="loading-screen">
      <div className="spinner"></div>
    </animated.div>
  );
};

export default LoadingScreen;
