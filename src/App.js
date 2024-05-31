import React, {} from 'react'
import Home from './Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PokemonData } from './PokemonData';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/pokemonInfo' element={<PokemonData />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
