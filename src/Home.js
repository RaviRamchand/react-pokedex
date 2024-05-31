import React, { useState, useEffect } from "react";
import background from './images/pokeBackground.jpg'
import mobileBackground from './images/mobileBackground.png'
import { Header } from "./Header";
import './style.css'
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    const [pokemonName, setPokemonName] = useState("")
    const [pokemonNameToSearch, setPokemonNameToSearch] = useState("");

    function handleChange(event) {
        setPokemonName(event.target.value)
    }


    function handleSubmit(event) {
        event.preventDefault();
        setPokemonNameToSearch(pokemonName)
    }

    useEffect(() => {
        if (pokemonNameToSearch) {
            setPokemonNameToSearch(pokemonNameToSearch.trim().toLowerCase())
            fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonNameToSearch)
                .then(res => res.json())
                .then(data => navigate("/pokemonInfo", { state: { pokemonData: data } }))
        }
    }, [pokemonNameToSearch, navigate])

    return (
        <div>
            <div className="d-block d-lg-none">
                <img src={mobileBackground} className="vw-100 vh-100" alt="Background" />
            </div>

            <div className="position-releative d-none d-lg-block">
                <img src={background} className="vw-100 vh-100 background-image" alt="Background" />
            </div>

            <div className="position-absolute top-50 start-50 translate-middle">
                <form onSubmit={handleSubmit}>

                    <div className="col-12 d-none d-md-block">
                        <div className="d-flex">
                            <input input type="text" placeholder="Pokemon Name or ID" onChange={handleChange} className="form-control input-lg w-auto" />
                            <button className="ms-2 button-colour w-100" disabled={pokemonName === ''}>Find Pokemon</button>
                        </div>
                    </div>

                    <div className="col d-block d-md-none text-center ">
                        <input input type="text" placeholder="Pokemon Name or ID" onChange={handleChange} className="form-control input-lg w-auto" />
                        <br />
                        <button className="button-colour w-100" disabled={pokemonName === ''}>Find Pokemon</button>
                    </div>

                </form>

            </div>

            <div className="position-absolute header-top start-50 translate-middle">
                <Header />
            </div>

        </div>
    )
}

export default Home