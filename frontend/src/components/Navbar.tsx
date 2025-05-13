import { useState } from "react";
import "../styles/Navbar.css"
import { Col, InputGroup, FormControl, Button } from "react-bootstrap";

function Navbar() {


    return (
            <nav className="navbar">
                <a href="/" className="logo">Pokédex</a>
                <ul className="nav-links">
                    <li><a href="/types">Types</a></li>
                    <li><a href="/abilities">Abilities</a></li>
                    <li><a href="/about">About</a></li>
                </ul>
            </nav>
    
    );
}

export default Navbar;