import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/PokemonPage.css"
import "../../styles/Type.css"
import "../../styles/Home.css"

import BASE_URL from "../../config";

function AbilityList() {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/abilities`);

            } catch (error) {
                console.error("API request failed", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="container">
            <h1>Abilities</h1>
            <div>Hello</div>
        </div>
    );

}

export default AbilityList