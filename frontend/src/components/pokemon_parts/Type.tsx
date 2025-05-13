import { useEffect } from "react";
import "../../styles/PokemonPage.css"
import "../../styles/Type.css"
import "../../styles/Home.css"
import BASE_URL from "../../config";

function Type(){

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/type/${name}`);
            }catch (error) {
                console.error("API request failed", error);
            }
        };
        fetchData();
    }, []);
    
    return (
        <div className="container">
            <h1>Types</h1>
            <div>Welcome</div>
        </div>
    );
}