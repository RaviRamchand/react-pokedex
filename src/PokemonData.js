import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";


export function PokemonData() {
    const { state } = useLocation();

    var pokemonType = ""

    const [species, setSpecies] = useState([]);
    const [description, setDescription] = useState('');
    const [isDark, setIsDark] = useState(false);
    const [borderType, setBorderType] = useState(state.pokemonData.types[0].type.name);

    const styles = {
        backgroundColor: (isDark) ? '#222222' : '#cccccc', height: '100vh',
        color: (isDark) ? 'white' : 'black',
        borderColor: (isDark) ? "white" : "black"
    }

    const typeStyles = {
        backgroundColor: "",
        width: "460px"
    }

    switch (borderType) {
        case 'electric':
            typeStyles.backgroundColor = '#F7D02C'
            break;
        case 'fire':
            typeStyles.backgroundColor = '#EE8130';
            break;
        case 'water':
            typeStyles.backgroundColor = '#6390F0'
            break;
        case 'grass':
            typeStyles.backgroundColor = '#7AC74C'
            break;
        case 'ice':
            typeStyles.backgroundColor = '#96D9D6'
            break;
        case 'fighting':
            typeStyles.backgroundColor = '#C22E28'
            break;
        case 'poison':
            typeStyles.backgroundColor = '#A33EA1'
            break;
        case 'ground':
            typeStyles.backgroundColor = '#E2BF65'
            break;
        case 'flying':
            typeStyles.backgroundColor = '#A98FF3'
            break;
        case 'psychic':
            typeStyles.backgroundColor = '#F95587'
            break;
        case 'bug':
            typeStyles.backgroundColor = '#A6B91A'
            break;
        case 'rock':
            typeStyles.backgroundColor = '#B6A136'
            break;
        case 'ghost':
            typeStyles.backgroundColor = '#735797'
            break;
        case 'dragon':
            typeStyles.backgroundColor = '#6F35FC'
            break;
        case 'dark':
            typeStyles.backgroundColor = '#705746'
            break;
        case 'steel':
            typeStyles.backgroundColor = '#B7B7CE'
            break;
        case 'fairy':
            typeStyles.backgroundColor = '#D685AD'
            break;
        default:
            typeStyles.backgroundColor = '#A8A77A'
            break;
    }

    useEffect(() => {
        if (state && state.pokemonData) {
            const speciesUrl = state.pokemonData.species.url;

            fetch(speciesUrl)
                .then(response => response.json())
                .then(speciesData => {
                    const flavorTextEntry = speciesData.flavor_text_entries.find(
                        entry => entry.language.name === 'en'
                    );
                    if (flavorTextEntry) {
                        setDescription(flavorTextEntry.flavor_text);
                    }
                })
                .catch(error => console.error('Error fetching species data:', error));

        }
    }, []);

    useEffect(() => {
        const species = state.pokemonData.species.url
        fetch(species)
            .then(res => res.json())
            .then(data => setSpecies(data))
    }, [])

    if (state && state.pokemonData && state.pokemonData.types) {
        const { types } = state.pokemonData;

        if (types.length === 2) {
            pokemonType = `${types[0].type.name} and ${types[1].type.name.charAt(0).toUpperCase() + types[1].type.name.slice(1)}`;
        } else if (types.length === 1) {
            pokemonType = types[0].type.name;
        }
    }

    function changeMode() {
        if (isDark) {
            setIsDark(false)
        }
        else {
            setIsDark(true)
        }
    }

    return (
        <div style={styles}>
            <a href="/"><Header /></a>
            <br />

            <button type="button" className="invisible btn btn-secondary position-absolute end-0 me-2" style={{ zIndex: 9999 }} onClick={changeMode}>{(isDark) ? "Light Mode" : "Dark Mode"}</button>

            <div className="container-fluid d-none d-lg-block">
                <div className="row position-relative ">
                    <div className="col-4 d-flex justify-content-center align-items-center d-inline">
                        <img src={state.pokemonData.sprites.other['official-artwork'].front_default} className="img-fluid border border-dark border-2 rounded ms-4 mt-5" style={typeStyles} alt="PokemonPic"/>
                    </div>
                    <div className="col">
                        <div>
                            <h1 className=" mt-4 display-5 text-center">
                                <u>{(state.pokemonData.name).charAt(0).toUpperCase() + state.pokemonData.name.slice(1)} #{JSON.stringify(state.pokemonData.id)}</u>
                            </h1><br />

                        </div>

                        <div className="col">
                            <br /><br /> <h5 className="text-center fw-normal">{description}</h5><br />
                        </div>

                        <div className="col">
                            <h5 className="text-center fw-normal">Type: {pokemonType.charAt(0).toUpperCase() + pokemonType.slice(1)}</h5><br />
                        </div>

                        <div className="col">
                            <h5 className="text-center fw-normal">HP: {state.pokemonData.stats[0].base_stat}</h5><br />
                        </div>

                        <div className="col">
                            <h5 className="text-center fw-normal">Base Happiness: {species.base_happiness}</h5>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <h5 className="text-center ms-4 mt-2 fw-normal">Height: {parseFloat(JSON.stringify(state.pokemonData.height) / 3.048).toFixed(2)} ft</h5>
                        <h5 className="text-center ms-4 mt-2 fw-normal">Weight: {parseFloat(JSON.stringify(state.pokemonData.weight) / 4.536).toFixed(2)} lbs</h5>
                    </div>
                </div>
            </div>


            <div className="container-fluid d-block d-lg-none">
                <div className="row position-relative ">

                    <div className="position-relative responsive-info mt-5 pt-5">
                        <br /><h1 className=" mt-4 display-5 text-center">
                            <u>{(state.pokemonData.name).charAt(0).toUpperCase() + state.pokemonData.name.slice(1)} #{JSON.stringify(state.pokemonData.id)}</u>
                        </h1><br />

                        <h5 className="text-center fw-normal">{description}</h5><br />

                        <h5 className="text-center fw-normal">Type: {pokemonType.charAt(0).toUpperCase() + pokemonType.slice(1)}</h5><br />

                        <h5 className="text-center fw-normal ">HP: {state.pokemonData.stats[0].base_stat}</h5><br />

                        <h5 className="text-center fw-normal">Base Happiness: {species.base_happiness}</h5><br />

                        <h5 className="text-center fw-normal">Height: {parseFloat(JSON.stringify(state.pokemonData.height) / 3.048).toFixed(2)} ft</h5> <br />
                        <h5 className="text-center fw-normal">Weight: {parseFloat(JSON.stringify(state.pokemonData.weight) / 4.536).toFixed(2)} lbs</h5>


                    </div>

                    <div className="col-4 position-absolute responsive-img translate-middle">
                        <img src={state.pokemonData.sprites.other['official-artwork'].front_default} className="img-fluid border border-dark border-2 rounded" style={typeStyles} alt="PokemonPic" />

                    </div>

                </div>

            </div>
        </div>
    );
}


//TODO: catch bad input

//https://www.epidemicjohto.com/t882-type-colors-hex-colors for the colour codes