
// src/components/PlantPredictor.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './PlantPredictor.css';
import Navbar from './Navbar';

const PlantPredictor = () => {
  const [formData, setFormData] = useState({
    Soil_Type: 'clay',
    Sunlight_Hours: '',
    Water_Frequency: 'daily',
    Fertilizer_Type: 'organic',
    Temperature: '',
    Humidity: ''
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const dataToSend = {
      Soil_Type: formData.Soil_Type,
      Sunlight_Hours: parseFloat(formData.Sunlight_Hours),
      Water_Frequency: formData.Water_Frequency,
      Fertilizer_Type: formData.Fertilizer_Type,
      Temperature: parseFloat(formData.Temperature),
      Humidity: parseFloat(formData.Humidity)
    };

    try {
      const response = await axios.post("http://localhost:8000/predict", dataToSend, {
        headers: { "Content-Type": "application/json" }
      });
      setPrediction(response.data.predicted_growth_milestone);
    } catch (error) {
      console.error("Prediction error:", error.response ? error.response.data : error.message);
      setError("Something went wrong. Please check your input or the server.");
    }
  };

  return (
    <div>
      <div className="plant-predictor-container">
        <h2 className="title">Plant Growth Predictor</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Soil Type:</label>
            <select name="Soil_Type" value={formData.Soil_Type} onChange={handleChange}>
              <option value="clay">Clay</option>
              <option value="loam">Loam</option>
              <option value="sandy">Sandy</option>
            </select>
          </div>

          <div className="form-group">
            <label>Sunlight Hours:</label>
            <input type="number" name="Sunlight_Hours" value={formData.Sunlight_Hours} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Water Frequency:</label>
            <select name="Water_Frequency" value={formData.Water_Frequency} onChange={handleChange}>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="bi-weekly">Bi-weekly</option>
            </select>
          </div>

          <div className="form-group">
            <label>Fertilizer Type:</label>
            <select name="Fertilizer_Type" value={formData.Fertilizer_Type} onChange={handleChange}>
              <option value="organic">Organic</option>
              <option value="chemical">Chemical</option>
            </select>
          </div>

          <div className="form-group">
            <label>Temperature (°C):</label>
            <input type="number" name="Temperature" value={formData.Temperature} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Humidity (%):</label>
            <input type="number" name="Humidity" value={formData.Humidity} onChange={handleChange} required />
          </div>

          <button type="submit" className="submit-button">Predict Growth</button>
        </form>

        {error && <div className="error-message">{error}</div>}

        {prediction !== null && (
          <div className="prediction-result">
            <h3>Predicted Growth Milestone: 🌾 {prediction.toFixed(2)}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantPredictor;