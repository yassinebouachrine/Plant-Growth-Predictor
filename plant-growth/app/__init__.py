# app/__init__.py

from flask import Flask

def create_app():
    app = Flask(__name__)

    # Import des routes définies dans app/routes.py
    from .routes import main_routes
    app.register_blueprint(main_routes)

    return app
