// src/App.js
import React, { useState } from 'react';
import PlantPredictor from './components/PlantPredictor';
import LoadingScreen from './components/LoadingScreen';
import './App.css';

function App() {
  const [showPredictor, setShowPredictor] = useState(false);

  return (
    <div className="App">
      {showPredictor ? (
        <PlantPredictor />
      ) : (
        <LoadingScreen onEnter={() => setShowPredictor(true)} />
      )}
    </div>
  );
}

export default App;