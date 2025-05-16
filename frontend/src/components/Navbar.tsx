import { useState } from "react";
import "../styles/Navbar.css"
import { Col, InputGroup, FormControl, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        navigate(`/pokemon/${query.toLowerCase()}`);
        setQuery(""); // clear input
    };

    return (
        <nav className="navbar">
            <a href="/" className="logo">Pokédex</a>
            <form className="search-bar" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search Pokémon..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            <ul className="nav-links">
                <li><a href="/types">Types</a></li>
                <li><a href="/abilities">Abilities</a></li>
                <li><a href="/about">About</a></li>
            </ul>

        </nav>

    );
}

export default Navbar;