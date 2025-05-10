// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import PlantPredictor from './components/PlantPredictor';
import About from './components/About';  // Added import
import Contact from './components/Contact';  // Added import
import Navbar from './components/Navbar';

function App() {
  return (
    <>
    <Navbar/>
   
    <Routes>
      <Route path="/" element={<LoadingScreen />} />
      <Route path="/model" element={<PlantPredictor />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
    </>
  );
}

export default App;
