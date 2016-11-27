import bunyan from 'bunyan';
import cors from 'cors';
import express from 'express';
import Promise from 'bluebird';
import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import config from './config';
import pokemons from './pokemons';
import getApi from './api';

const pokemonFields = ['id', 'name', 'height', 'weight'];
const metrica = ['fat', 'angular', 'heavy', 'light', 'huge', 'micro'];

class App {
  constructor(params) {
    Object.assign(this, params);
    if(!this.log) this.log = this.getLogger();
    this.init();
  }

  getLogger(params) {
    return bunyan.createLogger(Object.assign({
      name: 'task3c',
      src: __DEV__,
      level: 'trace'
    }), params);
  }

  async getPokemons(url, i=0 ) {
    this.log.trace("getPokemons", url, i);
    const response = await fetch(url);
    const page = await response.json();
    const pokemons = page.results;

    if(__DEV__ && i >= 1) {
      return pokemons;
    }
    if(page.next) {
      const pokemonsOffset = await this.getPokemons(page.next, i + 1);
      return pokemons.concat(pokemonsOffset);
    }
    return pokemons;
  }

  async getPokemon(url) {
    this.log.trace('getPokemon', url);
    const response = await fetch(url);
    const pokemon = await response.json();
    return pokemon;
  }

  initPokemons() {
    return {
      run: async () => {
        try {
          const pokemonsInfo = await this.getPokemons(this.config.pokeapi.url);
          const pokemonsPromise = pokemonsInfo.map((info) => {
            return this.getPokemon(info.url);
          })
          const pokemonsFull = await Promise.all(pokemonsPromise);
          const pokemons = pokemonsFull.map(pokemon => {
            let pokemonObj = {};
            pokemonFields.forEach(field => {
              pokemonObj[field] = pokemon[field];
            });
            return pokemonObj;
          });

          return pokemons;
        } catch (e) {
            this.log.error(e);
        }
      }
    }
  }

  init() {
    this.app = express();
    this.app.use(cors());
    this.useRoute();
    // this.getPoke = this.initPokemons();
  }

  useRoute() {
    const api = getApi(this);
    this.app.use('/task3c', api);
  }

  run() {
    // try {
    //   this.getPoke.run()
    //   .then(resolve => {
    //     this.pokemons = resolve;
    //   })
    // } catch(err) {
    //     this.log.error(err);
    // }

    return new Promise((resolve) => {
      this.app.listen(this.config.port, () => {
        this.log.info(`App "${this.config.name}" running on port ${this.config.port}`);
        resolve(this);
      });
    });
  }
}

const app = new App({config, pokemons, metrica});
app.run();
