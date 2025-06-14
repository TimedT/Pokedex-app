from flask import jsonify
import httpx

LATEST_VERSION_GROUP = "scarlet-violet"


class API:
    def __init__(self):
        self.BASE_URL = "https://pokeapi.co/api/v2"
        self.api_helper = APIHelper()

    def get_pokemon(self, name: str):
        try:
            name = name.replace(" ", "-")
            response = httpx.get(self.BASE_URL + "/pokemon/" + name, timeout=10.0)
            response.raise_for_status()
            data = response.json()

            stats = {s["stat"]["name"]: s["base_stat"] for s in data["stats"]}

            # ability stuff
            ability_raws = data.get("abilities", [])
            ability_details = []
            for entry in ability_raws:
                ability_name = entry["ability"]["name"]

                ability_details.append(
                    self.get_abilities(ability_name, entry["is_hidden"])
                )

            pokemon = {
                "name": data["name"].capitalize(),
                "height": data["height"],
                "weight": data["weight"],
                "types": [t["type"]["name"] for t in data["types"]],
                "abilities": ability_details,
                "image": data["sprites"]["other"]["official-artwork"]["front_default"],
                "stats": stats,
                "moves": self.sort_moves(data["moves"], LATEST_VERSION_GROUP),
            }

            return jsonify(pokemon)
        except httpx.HTTPStatusError as e:
            return jsonify({"error": "Pokémon not found"}), 404
        except httpx.RequestError as e:
            return jsonify({"error": "Failed to fetch data"}), 500

    # For get_pokemon
    def get_abilities(self, name: str, hidden: bool):
        try:

            response = httpx.get(self.BASE_URL + "/ability/" + name, timeout=10.0)
            response.raise_for_status()
            data = response.json()

            ability = {
                "name": self.api_helper.get_name(data["names"]),
                "effect": self.api_helper.get_effect(data["effect_entries"]),
                "hidden": hidden,
            }
            return ability
        except httpx.HTTPStatusError as e:
            return jsonify({"error": "ability not found"}), 404
        except httpx.RequestError as e:
            return jsonify({"error": "Failed to fetch data"}), 500

    # For get_pokemon
    def sort_moves(self, moves: list, version_group: str):
        groups = {"machine": [], "level": [], "egg": []}

        for entry in moves:
            move_name = entry["move"]["name"]

            for version_detail in entry["version_group_details"]:
                if version_detail["version_group"]["name"] != version_group:
                    continue

                method = version_detail["move_learn_method"]["name"]
                level = version_detail["level_learned_at"]

                move_data = {"name": move_name, "level": level if level > 0 else None}

                if method not in groups:
                    groups[method] = []
                groups[method].append(move_data)

                break
        return groups

    # For Ability page
    def get_ability(self, name: str):
        try:
            name = name.replace(" ", "-")
            print(name)
            response = httpx.get(self.BASE_URL + "/ability/" + name, timeout=10.0)
            response.raise_for_status()
            data = response.json()

            # splitting up out of battle effects
            effect = self.api_helper.get_full_effect(data["effect_entries"])
            parts = effect.split("Overworld:", 1)
            if len(parts) == 2:
                normal_effect = parts[0].strip()
                overworld_effect = parts[1].strip()
            else:
                normal_effect = effect.strip()
                overworld_effect = None

            pokemon = [
                {"hidden": t["is_hidden"], "name": t["pokemon"]["name"]}
                for t in data["pokemon"]
            ]

            ability = {
                "name": self.api_helper.get_name(data["names"]),
                "effect": normal_effect,
                "overworldEffect": overworld_effect,
                "shortEffect": self.api_helper.get_effect(data["effect_entries"]),
                "pokemon": pokemon,
            }
            # print(ability)
            return jsonify(ability)

        except httpx.HTTPStatusError as e:
            return jsonify({"error": "ability not found"}), 404
        except httpx.RequestError as e:
            return jsonify({"error": "Failed to fetch data"}), 500

    # for Type page
    def get_type(self, name: str):
        try:
            name = name.replace(" ", "-")
            print(name)
            response = httpx.get(self.BASE_URL + "/type/" + name, timeout=10.0)
            response.raise_for_status()
            data = response.json()

            damage_relations = {
                "double_damage_from": [
                    k["name"] for k in data["damage_relations"]["double_damage_from"]
                ],
                "double_damage_to": [
                    k["name"] for k in data["damage_relations"]["double_damage_to"]
                ],
                "half_damage_from": [
                    k["name"] for k in data["damage_relations"]["half_damage_from"]
                ],
                "half_damage_to": [
                    k["name"] for k in data["damage_relations"]["half_damage_to"]
                ],
                "no_damage_from": [
                    k["name"] for k in data["damage_relations"]["no_damage_from"]
                ],
                "no_damage_to": [
                    k["name"] for k in data["damage_relations"]["no_damage_to"]
                ],
            }

            type = {
                "name": data["name"],
                "damage_relations": damage_relations,
                "generation": data["generation"]["name"],
                "moves": [t["name"] for t in data["moves"]],
                "pokemon": [t["pokemon"]["name"] for t in data["pokemon"]],
            }
            print(type)
            return type

        except httpx.HTTPStatusError as e:
            return jsonify({"error": "ability not found"}), 404
        except httpx.RequestError as e:
            return jsonify({"error": "Failed to fetch data"}), 500

    def get_move(self, name: str):

        try:
            name = name.replace(" ", "-")

            response = httpx.get(self.BASE_URL + "/move/" + name, timeout=10.0)
            response.raise_for_status()
            data = response.json()
            move = {
                "name": data["name"],
                "accuracy": data["accuracy"],
                "effect": self.api_helper.get_full_effect(data["effect_entries"]),
                "power": data["power"],
                "pp": data["pp"],
                "type": data["type"]["name"],
                "priority": data["priority"],
                "category": data["damage_class"]["name"],
                "target": data["target"]["name"],
                "pokemon": [t["name"] for t in data["learned_by_pokemon"]],
            }

            # print(move)
            return jsonify(move)

        except httpx.HTTPStatusError as e:
            return jsonify({"error": "ability not found"}), 404
        except httpx.RequestError as e:
            return jsonify({"error": "Failed to fetch data"}), 500

    def get_type_list(self):
        try:
            response = httpx.get(self.BASE_URL + "/type?limit=18", timeout=10.0)
            response.raise_for_status()
            data = response.json()
            type_list = {"name": [t["name"] for t in data["results"]]}
            print(type_list)
            return type_list

        except httpx.HTTPStatusError as e:
            return jsonify({"error": "ability not found"}), 404
        except httpx.RequestError as e:
            return jsonify({"error": "Failed to fetch data"}), 500

    def get_ability_list(self):
        try:
            response = httpx.get(self.BASE_URL + "/ability?limit=1000", timeout=10.0)
            response.raise_for_status()
            data = response.json()
            ability_list = {"name": [t["name"] for t in data["results"]]}
            print(ability_list)
            return ability_list

        except httpx.HTTPStatusError as e:
            return jsonify({"error": "ability not found"}), 404
        except httpx.RequestError as e:
            return jsonify({"error": "Failed to fetch data"}), 500


class APIHelper:
    def __init__(self):
        self.BASE_URL = "https://pokeapi.co/api/v2"

    def check_errors(self, res: any) -> bool:
        return res.text == "Not Found" or res.status_code != 200

    def gen_error_response(self, res: any) -> dict:
        if res.text == "Not Found":
            return {
                "statusCode": 1,
                "statusMessage": "Not Found",
            }
        return {
            "statusCode": 2,
            "statusMessage": "Unknown error",
        }

    def get_stat(self, entries: list, stat: str) -> int:
        for entry in entries:
            if entry["stat"]["name"] == stat:
                return entry["base_stat"]
        return -1

    def get_effect(self, entries: list) -> str:
        return self._get_value(entries, "short_effect")

    def get_full_effect(self, entries: list) -> str:
        return self._get_value(entries, "effect")

    def get_name(self, entries: list) -> str:
        return self._get_value(entries, "name")

    def get_pokemon(self, entries: list) -> str:
        return self._get_value(entries, "name")

    def _get_value(self, entries: list, specifier: str) -> str:
        for entry in entries:
            if entry["language"]["name"] == "en":
                return entry[specifier]
        return ""
