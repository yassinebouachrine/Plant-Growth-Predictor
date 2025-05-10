import os
import numpy as np
import joblib
import tensorflow as tf
from fastapi import APIRouter, HTTPException, Request

router = APIRouter()

# === Load model and preprocessing objects ===
MODEL_DIR = os.path.join("model")
model = tf.keras.models.load_model(os.path.join(MODEL_DIR, "plant_growth_model.keras"))

scaler = joblib.load(os.path.join(MODEL_DIR, "scaler.pkl"))
soil_encoder = joblib.load(os.path.join(MODEL_DIR, "soil_type_encoder.pkl"))
fertilizer_encoder = joblib.load(os.path.join(MODEL_DIR, "fertilizer_type_encoder.pkl"))
water_encoder = joblib.load(os.path.join(MODEL_DIR, "water_frequency_encoder.pkl"))

# === Function to scale the prediction to a value between 0 and 1 ===
def scale_prediction(predicted_value):
    # Example scaling, adjust according to your data range
    min_value = 4.03  # Minimum possible value from the dataset
    max_value = 9.91  # Maximum possible value from the dataset
    
    scaled_value = (predicted_value - min_value) / (max_value - min_value)
    return scaled_value

# === Function to determine the growth stage based on the scaled value ===
def get_growth_stage_description(scaled_prediction):
    if scaled_prediction < 0.2:
        return "Early Growth Phase"
    elif scaled_prediction < 0.5:
        return "Mid Growth Phase"
    elif scaled_prediction < 0.8:
        return "Late Growth Phase"
    else:
        return "Mature Phase"

@router.post("/predict")
async def predict_growth(request: Request):
    try:
        data = await request.json()
        print(f"[INFO] Received data: {data}")

        # Encode and scale input
        features = [
            soil_encoder.transform([data["Soil_Type"]])[0],
            float(data["Sunlight_Hours"]),
            water_encoder.transform([data["Water_Frequency"]])[0],
            fertilizer_encoder.transform([data["Fertilizer_Type"]])[0],
            float(data["Temperature"]),
            float(data["Humidity"])
        ]

        # Scaling the features
        features_scaled = scaler.transform([features])
        prediction = model.predict(features_scaled)

        # Convert the numpy float32 to native Python float
        predicted_value = float(prediction[0][0])

        # Map the prediction value to a growth stage description
        if predicted_value < 0.2:
            growth_stage_description = "Early Growth"
        elif predicted_value < 0.5:
            growth_stage_description = "Mid Growth"
        elif predicted_value < 0.8:
            growth_stage_description = "Late Growth"
        else:
            growth_stage_description = "Mature Growth"

        return {
            "predicted_growth_milestone": predicted_value,
            "growth_stage_description": growth_stage_description
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing the data: {str(e)}")
