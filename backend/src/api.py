from flask import jsonify
import httpx


class API:
    def __init__(self):
        self.BASE_URL = "https://pokeapi.co/api/v2"

    def get_pokemon(self, name: str):
        try:

            response = httpx.get(self.BASE_URL + "/pokemon/" + name, timeout=10.0)
            response.raise_for_status()
            data = response.json()

            stats = [
                {"name": s["stat"]["name"], "value": s["base_stat"]}
                for s in data["stats"]
            ]
            pokemon = {
                "name": data["name"],
                "height": data["height"],
                "weight": data["weight"],
                "types": [t["type"]["name"] for t in data["types"]],
                "abilities": [t["ability"]["name"] for t in data["abilities"]],
                "image": data["sprites"]["other"]["official-artwork"]["front_default"],
                "stats": stats,
            }
            # print(pokemon)
            return jsonify(pokemon)
        except httpx.HTTPStatusError as e:
            return jsonify({"error": "Pokémon not found"}), 404
        except httpx.RequestError as e:
            return jsonify({"error": "Failed to fetch data"}), 500
