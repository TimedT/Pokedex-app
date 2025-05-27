import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/PokemonPage.css"
import "../../styles/Type.css"
import "../../styles/Home.css"

import BASE_URL from "../../config";

interface TypeList {
    name: string[];
}

function TypeList() {
    const [list, setList] = useState<TypeList | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/list/type`);
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
                <div className="loading-message">Searching for Types</div>
            </>);
    } else if (list.name == null) {
        return (
            <>
                <div className="error-message">Type list could not be found</div>
            </>);
    }

    return (
        <div className="container">
            <h1>Types</h1>
            {list && (
                <div className="table">
                    <ul className="type-text">
                        {list.name.map((t) => (
                            <li>
                                <a href={`/type/${t}`} className={`type-${t.toLowerCase()}`}>
                                    {t.toUpperCase()}
                                </a>
                            </li>


                        ))}
                    </ul>
                </div>
            )}

        </div>
    );

}

export default TypeList