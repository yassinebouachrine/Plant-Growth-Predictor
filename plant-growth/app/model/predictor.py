# app/model/predictor.py

import numpy as np
import tensorflow as tf

def make_prediction(
    soil_type, fertilizer_type, water_frequency,
    Sunlight_hours, temperature, humidity,
    soil_encoder, fertilizer_encoder, watering_encoder, scaler, model
):

    # Encodage des variables catégorielles
    soil_type_encoded = soil_encoder.transform([soil_type])[0]
    fertilizer_type_encoded = fertilizer_encoder.transform([fertilizer_type])[0]
    water_frequency_encoded = watering_encoder.transform([water_frequency])[0]
    

    # Création du vecteur de caractéristiques
    features = np.array([[soil_type_encoded, fertilizer_type_encoded,
                          water_frequency_encoded, float(Sunlight_hours),
                          float(temperature), float(humidity)]])
    
    # Normalisation
    features_scaled = scaler.transform(features)

    # Prédiction
    prediction = model.predict(features_scaled)

    return float(prediction[0][0])
