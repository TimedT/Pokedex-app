import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/PokemonPage.css"
import "../../styles/Main.css"
import formatName from "./NameFormatter";
import BASE_URL from "../../config";

interface Pokemon {
    id: number;
    name: string;
    hidden: boolean;
}

interface Ability {
    id: number;
    name: string;
    effect: string;
    overworldEffect: string;
    shortEffect: string; // mabye have flavor text instead
    pokemon: Pokemon[];
}

function Ability() {
    const { name } = useParams<{ name: string }>();
    const [ability, setAbility] = useState<Ability | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("hello")
                const response = await fetch(`${BASE_URL}/api/ability/${name}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch");
                }
                const data = await response.json();

                setAbility(data);


            } catch (error) {
                console.error("API request failed", error);
            }
        };
        fetchData();
    }, []);

    if (ability == null) {
        return (
            <>
                <div className="loading-message">Searching for Ability Data</div>
            </>);
    } else if (ability.name == null) {
        return (
            <>
                <div className="error-message">Ability could not be found</div>
            </>);
    } else {
        return (
            <div className="container">
                <h1>{ability.name} (Ability)</h1>
                <h2>Effect</h2>
                <p>{ability.effect}</p>
                {ability.overworldEffect && (
                    <>
                        <h3>Outside of Battle</h3>
                        <p>{ability.overworldEffect}</p>
                    </>
                )}
                <div className="table">
                    <h2>Pokemon with {ability.name}</h2>
                    <ul>
                        {ability.pokemon.map((p) => (
                            <li key={p.id}>
                                <a href={`../pokemon/${p.name}`}>{formatName(p.name)}</a>
                            </li>
                        )
                        )}
                    </ul>
                </div>
            </div>
        );
    }

}

export default Ability