import "./style.css";
import React, { useState } from "react";
import InputForm from "./components/InputForm";
import ResultDisplay from "./components/ResultDisplay";

function App() {
  const [prediction, setPrediction] = useState("");

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      setPrediction(data.result);
    } catch (error) {
      console.error("Error:", error);
      setPrediction("Error getting prediction");
    }
  };

  return (
    <>
      <div className="header">
        <h1>🌿 Plant Growth Predictor</h1>
      </div>
      <div className="container">
        <InputForm onSubmit={handleSubmit} />
        <ResultDisplay prediction={prediction} />
      </div>
    </>
  );
  
}

export default App;
