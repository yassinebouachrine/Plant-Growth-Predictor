import React, { useState } from "react";

const InputForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    soil_type: "",
    sunlight_hours: "",
    water_frequency: "",
    fertilizer_type: "",
    temperature: "",
    humidity: "",
    growthMilestone: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Soil Type: <input name="soil_type" onChange={handleChange} /></label><br />
      <label>Sunlight Hours: <input name="sunlight_hours" onChange={handleChange} /></label><br />
      <label>Water Frequency: <input name="water_frequency" onChange={handleChange} /></label><br />
      <label>Fertilizer Type: <input name="fertilizer_type" onChange={handleChange} /></label><br />
      <label>Temperature: <input name="temperature" onChange={handleChange} /></label><br />
      <label>Humidity: <input name="humidity" onChange={handleChange} /></label><br />
      <label>Growth Milestone: <input type="number" name="growthMilestone" value={formData.growthMilestone} onChange={handleChange} required/></label><br />
      <button type="submit">Predict</button>
    </form>
  );
};

export default InputForm;
