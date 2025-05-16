import { useEffect, useState } from "react";
import "../../styles/PokemonPage.css"
import "../../styles/Type.css"
import "../../styles/Home.css"
import formatName from "./NameFormatter";
import BASE_URL from "../../config";
import { useParams } from "react-router-dom";


interface DamageRelations {
    double_damage_to: string[];
    double_damage_from: string[];
    half_damage_to: string[];
    half_damage_from: string[];
    no_damage_to: string[];
    no_damage_from: string[];
}

interface Type {
    name: string;
    damage_relations: DamageRelations;
    generation: string;
    moves: string[];
    pokemon: string[];
}




function Type() {
    const { name } = useParams<{ name: string }>();
    const [type, setType] = useState<Type>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/type/${name}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch");
                }
                const data = await response.json();

                setType(data)

            } catch (error) {
                console.error("API request failed", error);
            }
        };
        fetchData();
    }, []);

    if (type == null) {
        return (
            <>
                <div className="loading-message">Searching for Type Data</div>
            </>);
    } else if (type.name == null) {
        return (
            <>
                <div className="error-message">Type could not be found</div>
            </>);
    }
    type.name = formatName(type.name);

    const damageCategories: { key: keyof typeof type.damage_relations; label: string }[] = [
        { key: "double_damage_to", label: "Deals Double Damage To" },
        { key: "double_damage_from", label: "Takes Double Damage From" },
        { key: "half_damage_to", label: "Deals Half Damage To" },
        { key: "half_damage_from", label: "Takes Half Damage From" },
        { key: "no_damage_to", label: "Deals No Damage To" },
        { key: "no_damage_from", label: "Takes No Damage From" },
    ];

    console.log(type)
    return (
        <div className="container">
            <h1>{type.name} (Type)</h1>
            <div className="basic-info-container">

                <h2>Damage Relations</h2>
                {damageCategories.map(({ key, label }) => {
                    const types = type.damage_relations[key];
                    if (!types || types.length === 0) return null;
                    return types && (
                        <div key={key}>
                            <h3>{label}</h3>
                            <ul className="type-text">
                                {types.map((t, index) => (

                                    <a key={index} href={`/type/${t}`} className={`type-${t.toLowerCase()}`}>
                                        {t.toUpperCase()}
                                    </a>

                                ))}
                            </ul>
                        </div>
                    );
                })}

                <div className="table">
                    <h2>{type.name} type Pokemon</h2>
                    <ul>
                        {type.pokemon.map((p) => (
                            <li >
                                <a href={`../pokemon/${p}`}>{formatName(p)}</a>
                            </li>
                        )
                        )}
                    </ul>
                </div>
                <div className="table">
                    <h2>{type.name} Moves</h2>
                    <ul>
                        {type.moves.map((p) => (
                            <li >
                                <a href={`../move/${p}`}>{formatName(p)}</a>
                            </li>
                        )
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Type