import { AsyncRouter } from 'express-async-router';
import _ from 'lodash';

export default (ctx) => {
  const api = AsyncRouter();
  api.get('/', (req, res) => {
    const offset = req.query.offset != undefined ? +req.query.offset : 0;
    const limit = req.query.limit != undefined ? +req.query.limit : 20;

    const sortPokemons = ctx.pokemons.sort((a, b) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
    });

    const pokemon = sortPokemons.map(pokemon => {
      return pokemon.name;
    });
    return res.json(pokemon.slice(offset, offset + limit));
  });

  function filter(o){
    return {
      fat: -(o.weight / o.height),
      angular: o.weight / o.height,
      heavy: -o.weight ,
      light: o.weight,
      huge: -o.height,
      micro: o.height
    }
  };

  api.get('/:metrica', (req, res) => {
    const key = req.params.metrica;
    const offset = req.query.offset != undefined ? +req.query.offset : 0;
    const limit = req.query.limit != undefined ? +req.query.limit : 20;

    if(ctx.metrica.indexOf(key) == -1)
      return res.status(404).send('Not Found');

    const sortPokemons = _.sortBy(ctx.pokemons, [(o) => {
      return filter(o)[ctx.metrica[ctx.metrica.indexOf(key)]];
    }]);

    const pokemon = sortPokemons.map(pokemon => {
      return pokemon.name;
    })
    return res.json(pokemon.slice(offset, offset + limit));
  })
  return api;
}
