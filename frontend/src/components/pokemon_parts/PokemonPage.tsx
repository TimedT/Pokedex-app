import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/PokemonPage.css"
import "../../styles/Type.css"
import "../../styles/Main.css"
import formatName from "./NameFormatter";
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

interface Move {
    name: string;
    level: number | null;
}

// methods = level-up || machine || egg
interface Moves {
    [method: string]: Move[];
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
    moves: Moves
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
        console.log(pokemon.moves);
        pokemon.moves["level-up"].sort((a, b) => {
            const levelA = a.level ?? 0;
            const levelB = b.level ?? 0;
            return levelA - levelB;
        });

        return (
            <div className="container">
                <div className="prev-next-extries">

                </div>
                <div className="basic-info-container">
                    <h1>{formatName(pokemon.name)}</h1>
                    <ul className="type-text">Type:
                        {pokemon.types.map((t, index) => (
                            <a className={`type-${t.toLowerCase()}`} key={index} href={`/type/${t}`}>{`${t.toUpperCase()}`}</a>
                        ))}
                    </ul>
                    <div>
                        <img src={`${pokemon.image}`} />
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

                <div className="evolution-container">

                </div>

                <div className="move-table-container">
                    <h2>Level Up Moves</h2>
                    <table className="level-up-move-table">
                        <thead>
                            <tr>
                                <th>Level</th>
                                <th>Move Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pokemon.moves["level-up"].map((p) =>
                                <tr>
                                    <td>{p.level}{!(p.level) && "Evolve"}</td>
                                    <td><a href={`../move/${p.name}`}>{formatName(p.name)}</a></td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <h2>TM Moves</h2>
                    <table className="level-up-move-table">
                        <thead>
                            <tr>
                                <th>Move Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pokemon.moves["machine"].map((p) =>
                                <tr>
                                    <td><a href={`../move/${p.name}`}>{formatName(p.name)}</a></td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <h2>Egg Moves</h2>
                    <table className="level-up-move-table">
                        <thead>
                            <tr>
                                <th>Move Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pokemon.moves["egg"].map((p) =>
                                <tr>
                                    <td><a href={`../move/${p.name}`}>{formatName(p.name)}</a></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default PokemonPage;