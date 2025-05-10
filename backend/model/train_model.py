import os
import pandas as pd
import numpy as np
import tensorflow as tf
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
import kagglehub

# === Paths ===
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # backend/model/
MODEL_DIR = BASE_DIR

# === Download dataset ===
dataset_path = kagglehub.dataset_download("gorororororo23/plant-growth-data-classification")
print("[INFO] Dataset path:", dataset_path)

# === Find CSV ===
csv_file = next((f for f in os.listdir(dataset_path) if f.endswith('.csv')), None)
if csv_file is None:
    raise FileNotFoundError("No CSV file found.")

csv_path = os.path.join(dataset_path, csv_file)
data = pd.read_csv(csv_path)
print("[INFO] Sample data:\n", data.head())

# === Encode categorical columns ===
label_encoders = {}
for col in ['Soil_Type', 'Fertilizer_Type', 'Water_Frequency']:
    le = LabelEncoder()
    data[col] = le.fit_transform(data[col])
    label_encoders[col] = le
    joblib.dump(le, os.path.join(MODEL_DIR, f"{col.lower()}_encoder.pkl"))

# === Prepare features & target ===
features = ['Soil_Type', 'Sunlight_Hours', 'Water_Frequency', 'Fertilizer_Type', 'Temperature', 'Humidity']
target = 'Growth_Milestone'
X = data[features]
y = data[target]

# === Scaling ===
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
joblib.dump(scaler, os.path.join(MODEL_DIR, 'scaler.pkl'))

# === Train/Test split ===
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# === Build & Train model ===
model = tf.keras.Sequential([
    tf.keras.layers.Input(shape=(X_train.shape[1],)),
    tf.keras.layers.Dense(32, activation='relu'),
    tf.keras.layers.Dense(16, activation='relu'),
    tf.keras.layers.Dense(1)
])
model.compile(optimizer='adam', loss='mse', metrics=['mae'])

# Train the model
model.fit(X_train, y_train, epochs=100, validation_split=0.1)

# === Evaluate Model ===
loss, mae = model.evaluate(X_test, y_test)
print(f"[INFO] Model evaluation - Loss: {loss}, MAE: {mae}")

# === Save model ===
model.save(os.path.join(MODEL_DIR, 'plant_growth_model.keras'))
print(f"[INFO] Model saved to {MODEL_DIR}")
