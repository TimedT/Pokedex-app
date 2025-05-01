import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/PokemonPage.css"


const BASE_URL = "http://127.0.0.1:1234";


interface Ability {
    id: number;
    name: string;
    effect: string;
}

interface Type {
    id: number;
    name: string;
}

interface Stats {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
    height: number;
    weight: number;
}

interface Pokemon {
    name: string;
    abilities: Ability[];
    id: number;
    hp: number;
    type: Type[];
    stats: Stats;
    height: number;
    weight: number;
    image: string;

}


function PokemonPage() {
    const { name } = useParams<{ name: string }>();
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    //const [abilities, setAbilities] = useState<Ability[]>([]);
    //const [type, setType] = useState<Type[]>([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await fetch(`http://127.0.0.1:5000/api/pokemon/ditto`);
                const response = await fetch(`${BASE_URL}/api/pokemon/${name}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch");
                }
                const data = await response.json();

                setPokemon(data);
                //setAbilities(data.abilities);
                //setType(data.types);

            } catch (error) {
                console.error("API request failed", error);
            }
        };
        fetchData();
    }, []);

    if (pokemon == null) {
        return (
            <>
                <div className="loading-message">Searching for Pokemon Data</div>
            </>);
    } else if (pokemon.name == null) {
        return (
            <>
                <div className="error-message">Pokemon could not be found</div>
            </>);
    } else {
        return (
            <div className="container">
                <div className="basic-info-container">
                    <h1>{pokemon?.name}</h1>
                    
                    <div>
                        <img src={`${pokemon.image}`} />
                    </div>
                </div>

            </div>
        );
    }
}

export default PokemonPage;