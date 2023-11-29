import React, { useState } from 'react';
import axios from 'axios';
import pokedex from "./../public/pokedex.png"

const PokemonApp = () => {
  const [userInput, setUserInput] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [shiny, setShiny] = useState(false);
  const [frontImg, setFrontImg] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userInput == "") return
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${userInput}`);
      setPokemonData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDefaultClick = () => {
    setShiny(false);
    setFrontImg(true);
  };

  const handleShinyClick = () => {
    setShiny(true);
    setFrontImg(true);
  };

  const handleChangeClick = () => {
    if (!shiny && frontImg) {
      setFrontImg(false);
    } else if (!shiny && !frontImg) {
      setFrontImg(true);
    } else if (shiny && frontImg) {
      setFrontImg(false);
    } else if (shiny && !frontImg) {
      setFrontImg(true);
    }

    const [userInput1, setUserInput1] = useState('');
    const [pokemonData1, setPokemonData1] = useState(null);

    const handleSubmit1 = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${userInput1}`);
        setPokemonData(response.data);
      } catch (error) {
        console.error(error);
      }

    }
  }


  return (
    <div className='container'>

      <form className='form' onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />

      </form>
      <div className='pokedex'>
      <img src={pokedex} alt="" />
      </div>
      {pokemonData && (
        <div className='cont'>
          <img
            src={
              shiny
                ? frontImg
                  ? pokemonData.sprites.front_shiny
                  : pokemonData.sprites.back_shiny
                : frontImg
                  ? pokemonData.sprites.front_default
                  : pokemonData.sprites.back_default
            }
            alt={pokemonData.forms[0].name}
          />
          <h1>{pokemonData.forms[0].name}</h1>
          <div className='buttons'>
            <button onClick={handleDefaultClick}>Default</button>
            <button onClick={handleShinyClick}>Shiny</button>
            <button onClick={handleChangeClick}>Change</button>
          </div>

          {pokemonData.types.map((type, index) => (
            <div key={index} className={`type ${type.type.name}`}>
              {type.type.name}
            </div>

          ))}


          <p>{`HP: ${pokemonData.stats[5].base_stat}`}</p>
          <p>{`Attack: ${pokemonData.stats[4].base_stat}`}</p>
          <p>{`Defense: ${pokemonData.stats[3].base_stat}`}</p>
          <p>{`Sp. Attack: ${pokemonData.stats[2].base_stat}`}</p>
          <p>{`Sp. Defense: ${pokemonData.stats[1].base_stat}`}</p>
          <p>{`Speed: ${pokemonData.stats[0].base_stat}`}</p>
          <p>{`Weight: ${pokemonData.weight}`}</p>
          <p>{`Height: ${pokemonData.height}`}</p>
        </div>

      )}
    </div>
  )
};

export default PokemonApp;