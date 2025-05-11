import os
import pandas as pd
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
import joblib

# Définition des chemins
base_dir = os.path.dirname(__file__)
data_path = os.path.join(base_dir, 'data', 'dataset.csv')
model_dir = os.path.join(base_dir, '..', 'app', 'model')

# Chargement des données
data = pd.read_csv(data_path)

# Prétraitement

X = data[['Soil_Type', 'Sunlight_Hours', 'Water_Frequency', 'Fertilizer_Type', 'Temperature', 'Humidity']].copy()
y = data['Growth_Milestone']

# Encodage
soil_encoder = LabelEncoder()
fertilizer_encoder = LabelEncoder()
watering_encoder = LabelEncoder()

X['Soil_Type'] = soil_encoder.fit_transform(X['Soil_Type'])
X['Fertilizer_Type'] = fertilizer_encoder.fit_transform(X['Fertilizer_Type'])
X['Water_Frequency'] = watering_encoder.fit_transform(X['Water_Frequency'])

# Normalisation
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Split
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# Modèle
model = tf.keras.Sequential([
    tf.keras.layers.Dense(64, activation='relu', input_shape=(X_train.shape[1],)),
    tf.keras.layers.Dense(32, activation='relu'),
    tf.keras.layers.Dense(1)
])

# Entraînement
model.compile(optimizer='adam', loss='mse')
model.fit(X_train, y_train, epochs=30, batch_size=32)  

# Sauvegardes
os.makedirs(model_dir, exist_ok=True)
model.save(os.path.join(model_dir, 'plant_growth_model.keras'))
joblib.dump(scaler, os.path.join(model_dir, 'scaler.pkl'))
joblib.dump(soil_encoder, os.path.join(model_dir, 'soil_type_encoder.pkl'))
joblib.dump(fertilizer_encoder, os.path.join(model_dir, 'fertilizer_type_encoder.pkl'))
joblib.dump(watering_encoder, os.path.join(model_dir, 'water_frequency_encoder.pkl'))

print("✅ Modèle et encodeurs sauvegardés avec succès !")
