import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/PokemonPage.css"
import "../../styles/Type.css"
import "../../styles/Main.css"

import BASE_URL from "../../config";


interface Ability {
    id: number;
    name: string;
    effect: string;
    hidden: boolean;
}

interface Type {
    [x: string]: any;
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
}

interface Pokemon {
    name: string;
    abilities: Ability[];
    id: number;
    hp: number;
    types: Type[];
    height: number;
    weight: number;
    image: string;

}

const StatBar = ({ label, value }: { label: string; value: number }) => {
    const max = 200; 
  
    return (
      <div className="stat-row">
        <span className="stat-label">{label}</span>
        <span className="stat-value">{value}</span>
        <div className="stat-bar-container">
          <div
            className="stat-bar-fill"
            style={{ width: `${(value / max) * 100}%` }}
          ></div>
        </div>
        
      </div>
    );
};


function PokemonPage() {
    const { name } = useParams<{ name: string }>();
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [abilities, setAbilities] = useState<Ability[]>([]);
    //const [types, setType] = useState<Type[]>([]);
    const [stats, setStats] = useState<Stats | null>(null);

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
                
                setAbilities(data.abilities);
                //setType(data.types);
                
                // converting stats
                const stats: Stats = {
                    hp: data.stats.hp,
                    attack: data.stats.attack,
                    defense: data.stats.defense,
                    specialAttack: data.stats["special-attack"],
                    specialDefense: data.stats["special-defense"],
                    speed: data.stats.speed,
                };
                setStats(stats)

            } catch (error) {
                console.error("API request failed", error);
            }
        };
        fetchData();
        
    }, []);
    
    // pokemon?.types.map((t) => {
    //     console.log(t.name)
    // })
    
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
                    <ul className="type-text">Type:
                        {pokemon?.types.map((t, index) => (
                            <a className={`type-${t.toLowerCase()}`} key={index} href={`/type/${t}`}>{`${t.toUpperCase()}`}</a>
                        ))}
                    </ul>
                    <div>
                        <img src={`${pokemon?.image}`} />
                    </div>
                    <h4>Abilities:</h4>
                    {abilities.map((ability, index) => (
                        <li className="no-bullets" key={ability.id | index}>
                            {index + 1}. <a className="ability" href={`/ability/${ability.name}`} > {ability.name}</a>
                            - {ability.effect} 
                            {ability.hidden && <strong> (Hidden ability)</strong>}
                            
                        </li>
                    ))}
                    <br></br>
                    {stats && (
                    <div className="stats">
                        <StatBar label="HP" value={stats.hp} />
                        <StatBar label="Attack" value={stats.attack} />
                        <StatBar label="Defense" value={stats.defense} />
                        <StatBar label="Sp. Atk" value={stats.specialAttack} />
                        <StatBar label="Sp. Def" value={stats.specialDefense} />
                        <StatBar label="Speed" value={stats.speed} />
                    </div>
                )}
                </div>
                

            </div>
        );
    }
}

export default PokemonPage;