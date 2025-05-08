// src/components/LoadingScreen.jsx
import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ onEnter }) => {
  return (
    <div className="loading-screen">
      <div className="hero">
        <div className="highlight">Empowering Green Intelligence <span className="dot" /></div>
        <h1 className="nature-text">Nature</h1>
        <p className="description">
          Predict Plant Growth,
          Explore how environmental factors affect your plant's development. Input real conditions,
          and let AI predict the next growth milestone of your plant.
        </p>
        <div className="circle-button" onClick={onEnter} title="Start Prediction">→</div>
      </div>
    </div>
  );
};

export default LoadingScreen;
