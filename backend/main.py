from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
import httpx

from src import api

app = Flask(__name__)
CORS(app)  # This enables CORS for all routes
api = api.API()


@app.route("/api/message")
def get_message():
    return jsonify({"message": "Hello from Flask + React + TypeScript!"})


@app.route("/api/pokemon/<name>")
def get_pokemon(name):
    pokemon = api.get_pokemon(name)
    return pokemon


@app.route("/api/ability/<name>")
def get_ability(name):
    ability = api.get_ability(name)
    return ability


@app.route("/api/type/<name>")
def get_type(name):
    type = api.get_type(name)
    return type


if __name__ == "__main__":
    app.run(debug=True, port=1234)
