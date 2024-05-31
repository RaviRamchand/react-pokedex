import React from "react";
import headerImage from "./images/pokemonlogo.png"
import './style.css'

export function Header() {
    return (
        <nav className="navbar header-colour">
            <img src={headerImage} className="rounded mx-auto d-block img-fluid" alt="" width={200} />
        </nav>
    )
}