import express from 'express';
import Promise from 'bluebird';
import fetch from 'isomorphic-fetch';
// import _ from 'lodash';
// import canonize from './canonize';
const _DEV_ = false;

const app = express();

// app.get('/canonize', (req, res) => {
//   const username = canonize(req.query.url);
//   res.json({
//     url: req.query.url,
//     username
//   });
// });

const baseUrl = 'http://pokeapi.co/api/v2';
const pokemonFields = ['id', 'name', 'base_experience', 'height', 'is_default', 'order', 'weight'];

async function getPokemons(url, i = 0) {
  console.log("GetPokemons ", url, i);
  const response = await fetch(url);
  const page = await response.json();
  const pokemons = page.results;
  if(_DEV_ && i > 0) {
    return pokemons;
  }
  if(page.next) {
    const pokemons2 = await getPokemons(page.next, i + 1);
    return pokemons.concat(pokemons2);
  }
  return pokemons;
}

async function getPokemon(url) {
  console.log("GetPokemon ", url);
  const response = await fetch(url);
  const pokemon = await response.json();
  return pokemon;
}

app.get('/', async (req, res) => {
  try {
    const pokemonsUrl = `${baseUrl}/pokemon`;
    const pokemonsInfo = await getPokemons(pokemonsUrl);
    const pokemonsPromises = pokemonsInfo.map(info => {
      return getPokemon(info.url);
    });

    const pokemonsFull = await Promise.all(pokemonsPromises);
    const pokemons = pokemonsFull.map(pokemon => {
      let pokemonPick = {};
      pokemonFields.forEach(item => {
        pokemonPick[item] = pokemon[item];
      });
      return pokemonPick;
    });

    const sortPokemons = pokemons.sort((a, b) => {
      if (a.weight > b.weight) return 1;
      if (a.weight < b.weight) return -1;
    });
    return res.json(pokemonsFull);
  } catch(err) {
    console.log(err);
    return res.json({ err });
  }
});


app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
