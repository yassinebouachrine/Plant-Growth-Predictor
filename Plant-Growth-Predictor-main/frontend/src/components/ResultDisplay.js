import React from "react";

const ResultDisplay = ({ prediction }) => {
  return (
    <div className="result">
      <h3>Prediction:</h3>
      <p>{prediction ? prediction : "Awaiting input..."}</p>
    </div>
  );
};

export default ResultDisplay;
