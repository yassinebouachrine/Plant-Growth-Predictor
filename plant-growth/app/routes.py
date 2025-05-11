
# app/routes.py
import tensorflow as tf
import joblib
import numpy as np
from app.model.predictor import make_prediction
from flask import Blueprint, request, jsonify


main_routes = Blueprint('main_routes', __name__)

# Chargement des encodeurs et du modèle entraîné
model = tf.keras.models.load_model('app/model/plant_growth_model.keras')
scaler = joblib.load('app/model/scaler.pkl')
soil_encoder = joblib.load('app/model/soil_type_encoder.pkl')
fertilizer_encoder = joblib.load('app/model/fertilizer_type_encoder.pkl')
watering_encoder = joblib.load('app/model/water_frequency_encoder.pkl')

@main_routes.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        soil_type = data.get('soil_type')
        fertilizer_type = data.get('fertilizer_type')
        water_frequency = data.get('water_frequency')
        Sunlight_hours = float(data.get('Sunlight_hours'))
        temperature = float(data.get('temperature'))
        humidity = float(data.get('humidity'))

        # Appel de la prédiction
        prediction = make_prediction(
        soil_type, fertilizer_type, water_frequency,
        Sunlight_hours, temperature, humidity,
        soil_encoder, fertilizer_encoder, watering_encoder, scaler, model
        )

        
        return jsonify({'prediction': prediction})

    except Exception as e:
        return jsonify({'error': str(e)}), 400