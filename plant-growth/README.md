# Documentation du Projet : Prédiction de la Croissance des Plantes

## Description

Ce projet permet de prédire la croissance d'une plante en fonction de diverses caractéristiques environnementales et de gestion des plantes. Le modèle utilise un réseau de neurones pour effectuer les prédictions. Il prend en compte des facteurs comme le type de sol, le type d'engrais, la fréquence d'arrosage, les heures de lumière, la température et l'humidité.

## Structure du Projet

```
plant-growth/
│
├── app/                    # Dossier contenant l'application Flask
│   ├── __init__.py         # Initialisation de l'application Flask
│   ├── routes.py           # Définitions des routes pour l'API
│   └── model/              # Dossier contenant les modèles et le code de prédiction
│       |
│       ├── predictor.py    # Contient la fonction make_prediction
│       └── soil_type_encoder.pkl
│       └── fertilizer_type_encoder.pkl
│       └── watering_encoder.pkl
│       └── scaler.pkl
│       └── plant_growth_model.keras
│
├── training/               # Dossier de formation du modèle
│   ├── train_model.py      # Script d'entraînement du modèle
│   └── data/               # Dossier contenant les données d'entraînement
│       └── dataset.csv     # Dataset pour l'entraînement du modèle
│
├── requirements.txt        # Dépendances nécessaires pour l'exécution du projet
├── run.py                  # Point d'entrée pour lancer l'application Flask
└── README.md               # Documentation du projet
```

### Fichiers et Dossiers

- `app/__init__.py` : Ce fichier initialise l'application Flask.
- `app/routes.py` : Contient les routes de l'API, notamment la route `/predict` pour effectuer des prédictions.
- `app/model/predictor.py` : Contient la fonction `make_prediction`, qui réalise la prédiction en utilisant le modèle et les encodeurs.
- `training/train_model.py` : Script utilisé pour entraîner le modèle de prédiction à partir du dataset CSV.
- `training/data/dataset.csv` : Contient les données nécessaires à l'entraînement du modèle. Il inclut des colonnes comme `Soil_Type`, `light_Hours`, `Water_Frequency`, `Fertilizer_Type`, `Temperature`, `Humidity`, et `Growth_Rate`.
- `requirements.txt` : Liste des dépendances nécessaires pour faire fonctionner le projet.
- `run.py` : Script principal pour exécuter le serveur Flask.
- `README.md` : Documentation du projet.

## Installation

1. Clonez le repository :
   ```bash
   git clone <URL_DE_VOTRE_REPOSITORY>
   cd plant-growth
   ```

2. Créez un environnement virtuel et activez-le :
   ```bash
   python -m venv venv
   source venv/bin/activate  # Sur Linux/Mac
   venv\Scripts\activate     # Sur Windows
   ```

3. Installez les dépendances :
   ```bash
   pip install -r requirements.txt
   ```

## Lancer l'Application

Pour lancer l'application Flask, exécutez le fichier `run.py` :

```bash
python run.py
```

L'application démarrera sur `http://127.0.0.1:5000`.

## Effectuer une Prédiction

Pour effectuer une prédiction de la croissance d'une plante, envoyez une requête POST à l'endpoint `/predict` avec un corps JSON, par exemple via `curl` :

```bash
curl -X POST http://127.0.0.1:5000/predict -H "Content-Type: application/json" -d '{
  "soil_type": "clay",
  "fertilizer_type": "organic",
  "water_frequency": "daily",
  "sunlight_hours": 8,
  "temperature": 25,
  "humidity": 65
}'
```

Vous recevrez une réponse JSON avec la prédiction de la croissance :

```json
{
  "prediction": 4.068665027618408
}
```

## Entraîner le Modèle

1. Pour entraîner le modèle avec les données de `dataset.csv`, exécutez le script `train_model.py` :

   ```bash
   python training/train_model.py
   ```

2. Le modèle sera enregistré sous forme de fichier `.keras` dans le dossier `app/model/`.

## Dépendances

Les dépendances nécessaires sont listées dans `requirements.txt` :

- Flask
- TensorFlow
- scikit-learn
- joblib
- numpy
- pandas 



## Licence

Ce projet est sous licence MIT.
