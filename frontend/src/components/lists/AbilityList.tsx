import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/PokemonPage.css"
import "../../styles/Type.css"
import "../../styles/Home.css"

import BASE_URL from "../../config";
import formatName from "../pokemon_parts/NameFormatter";

interface AbilityList {
    name: string[];
}

function AbilityList() {
    const [list, setList] = useState<AbilityList | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/list/ability`);
                if (!response.ok) {
                    throw new Error("Failed to fetch");
                }
                const data = await response.json();

                setList(data);

            } catch (error) {
                console.error("API request failed", error);
            }
        };
        fetchData();
    }, []);

    if (list == null) {
        return (
            <>
                <div className="loading-message">Searching for Abilities</div>
            </>);
    } else if (list.name == null) {
        return (
            <>
                <div className="error-message">Ability list could not be found</div>
            </>);
    }
    return (
        <div className="container">
            <h1>Abilities</h1>
            {list && (
                <ul className="table">
                    {list.name.map((p) => (
                        <li>
                            <a href={`../ability/${p}`}>{formatName(p)}</a>
                        </li>
                    )
                    )}
                </ul>

            )}

        </div>
    );

}

export default AbilityList