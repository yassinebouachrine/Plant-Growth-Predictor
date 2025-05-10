import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PlantPredictor.css';

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
    setPrediction(null);

    // Validate inputs
    const { Sunlight_Hours, Temperature, Humidity } = formData;
    if (!Sunlight_Hours || !Temperature || !Humidity) {
      setError("All numeric fields must be filled in.");
      return;
    }

    const dataToSend = {
      Soil_Type: formData.Soil_Type,
      Sunlight_Hours: parseFloat(Sunlight_Hours),
      Water_Frequency: formData.Water_Frequency,
      Fertilizer_Type: formData.Fertilizer_Type,
      Temperature: parseFloat(Temperature),
      Humidity: parseFloat(Humidity)
    };

    try {
      const response = await axios.post("http://localhost:8000/predict", dataToSend, {
        headers: { "Content-Type": "application/json" }
      });
      setPrediction(response.data.predicted_growth_milestone);
    } catch (err) {
      console.error("Prediction error:", err.response ? err.response.data : err.message);
      setError("Something went wrong. Please check your input or the server.");
    }
  };

  // Auto-hide error or prediction after 4 seconds
  useEffect(() => {
    if (error || prediction !== null) {
      const timer = setTimeout(() => {
        setError(null);
        setPrediction(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [error, prediction]);

  return (
    <div>
      <div className="plant-predictor-container">
        <h2 className="title">Plant Growth Predictor</h2>
        <form onSubmit={handleSubmit} className="form">

          <div className="form-row">
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
              <input
                type="number"
                name="Sunlight_Hours"
                value={formData.Sunlight_Hours}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
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
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Temperature (°C):</label>
              <input
                type="number"
                name="Temperature"
                value={formData.Temperature}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Humidity (%):</label>
              <input
                type="number"
                name="Humidity"
                value={formData.Humidity}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="submit-button">Predict Growth</button>
        </form>

        {(error || prediction !== null) && (
          <div className={`message-box ${error ? 'error' : 'success'}`}>
            {error ? (
              <p>{error}</p>
            ) : (
              <p>Predicted Growth Milestone: 🌾 {prediction.toFixed(2)}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantPredictor;
