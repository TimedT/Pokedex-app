import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/PokemonPage.css"
import "../../styles/Main.css"
import "../../styles/Type.css"
import "../../styles/Move.css"
import formatName from "./NameFormatter";
import BASE_URL from "../../config";


interface Move {
    name: string;
    accuracy: number;
    effect: string;
    power: number;
    pp: number;
    type: string;
    priority: number;
    category: string;
    target: string;
    pokemon: string[];
}


function Move() {
    const { name } = useParams<{ name: string }>();
    const [move, setMove] = useState<Move | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/move/${name}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch");
                }
                const data = await response.json();

                setMove(data);


            } catch (error) {
                console.error("API request failed", error);
            }
        };
        fetchData();
    }, []);

    if (move == null) {
        return (
            <>
                <div className="loading-message">Searching for Ability Data</div>
            </>);
    } else if (move.name == null) {
        return (
            <>
                <div className="error-message">Ability could not be found</div>
            </>);
    }
    console.log(move)
    move.name = formatName(move.name)

    return (
        <div className="container">
            <h1>{move.name} (Move)</h1>
            <div className="move-info">
                <table className="move-table">
                    <tbody>
                        <tr>
                            <th>Type</th>
                            <td className="type-text">
                                <a href={`/type/${move.type}`} className={`type-${move.type.toLowerCase()}`}>
                                    {move.type.toUpperCase()}
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <th>Category</th>
                            <td>{move.category}</td>
                        </tr>
                        <tr>
                            <th>Power</th>
                            <td>{move.power ?? "—"}</td>
                        </tr>
                        <tr>
                            <th>Accuracy</th>
                            <td>{move.accuracy ?? "—"}</td>
                        </tr>
                        <tr>
                            <th>Priority</th>
                            <td>{move.priority}</td>
                        </tr>
                        <tr>
                            <th>PP</th>
                            <td>{move.pp} ({move.pp * 1.6} max)</td>
                        </tr>

                    </tbody>
                </table>

                <div className="move-effect">
                    <h3>Effect</h3>
                    <p>{move.effect}</p>
                </div>
            </div>

            <div className="table">
                <h2>Pokemon with {move.name}</h2>
                <ul>
                    {move.pokemon.map((p) => (
                        <li >
                            <a href={`../pokemon/${p}`}>{formatName(p)}</a>
                        </li>
                    )
                    )}
                </ul>
            </div>
        </div>

    );
}

export default Move