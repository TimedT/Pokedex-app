import "../styles/main.css"
import "../styles/home.css"
import { useNavigate } from "react-router-dom";
import RandomPokemon from "./pokemon_parts/RandomPokemon";



function Home() {


    if (true) {
        return (
            <div className="container">
                <h1>Welcome </h1>
                <h3>Search for a pokemon or click something below</h3>
                <div>
                    <p>Can I offer you an <a href="/Pokemon/incineroar">Incineroar</a>?</p>
                </div>
                <RandomPokemon />
            </div>
        );
    } else {
        return <><h1>things</h1></>
    }
}

export default Home;