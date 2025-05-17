from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
import httpx

from src import api

app = Flask(__name__)
CORS(app)  # This enables CORS for all routes
api = api.API()

ABOUT_FILE_PATH = "frontend/public/about.txt"


@app.route("/api/about", methods=["POST"])
def save_about():
    data = request.json
    content = data.get("content", "")

    try:
        with open(ABOUT_FILE_PATH, "w", encoding="utf-8") as f:
            f.write(content)
        return jsonify({"message": "About text saved successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/about", methods=["GET"])
def get_about():
    try:
        with open(ABOUT_FILE_PATH, "r", encoding="utf-8") as f:
            content = f.read()
        return jsonify({"content": content}), 200
    except FileNotFoundError:
        return jsonify({"content": ""}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


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


@app.route("/api/move/<name>")
def get_move(name):
    move = api.get_move(name)
    return move


if __name__ == "__main__":
    app.run(debug=True, port=1234)
