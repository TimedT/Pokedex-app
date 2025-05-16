import { useNavigate } from "react-router-dom";


const RandomPokemon = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        const randomId = Math.floor(Math.random() * 1025) + 1;
        navigate(`/pokemon/${randomId}`);
    };

    return (
        <button className="random-pokemon-button" onClick={handleClick}>
            🎲 Random Pokémon
        </button>
    );
};

export default RandomPokemon