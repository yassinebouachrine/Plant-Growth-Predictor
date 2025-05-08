import os
import numpy as np
import joblib
import tensorflow as tf
from fastapi import APIRouter, HTTPException, Request

router = APIRouter()

# Load model and preprocessing objects
MODEL_DIR = os.path.join("model")
model = tf.keras.models.load_model(os.path.join(MODEL_DIR, "plant_growth_model.keras"))

scaler = joblib.load(os.path.join(MODEL_DIR, "scaler.pkl"))
soil_encoder = joblib.load(os.path.join(MODEL_DIR, "soil_type_encoder.pkl"))
fertilizer_encoder = joblib.load(os.path.join(MODEL_DIR, "fertilizer_type_encoder.pkl"))
water_encoder = joblib.load(os.path.join(MODEL_DIR, "water_frequency_encoder.pkl"))

@router.post("/predict")
async def predict_growth(request: Request):
    try:
        data = await request.json()
        print(f"Received data: {data}")  # Log the incoming data

        # Process the data here...
        features = [
            soil_encoder.transform([data["Soil_Type"]])[0],
            float(data["Sunlight_Hours"]),
            water_encoder.transform([data["Water_Frequency"]])[0],
            fertilizer_encoder.transform([data["Fertilizer_Type"]])[0],
            float(data["Temperature"]),
            float(data["Humidity"])
        ]

        features_scaled = scaler.transform([features])
        prediction = model.predict(features_scaled)
        return {"predicted_growth_milestone": float(prediction[0][0])}

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing the data: {str(e)}")
