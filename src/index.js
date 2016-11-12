import express from 'express';
import cors from 'cors';
import summa from './summa';
import canonize from './canonize';
import getUsername from './getUsername';

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.json({
    hello: 'JS World',
  });
});

app.get('/task2A', (req, res) => {
  const sum = summa(req.query.a, req.query.b)
  res.send(`${sum}`);
});

app.get('/task2B', (req, res) => {
  const name = canonize(req.query.fullname)
  res.send(`${name}`);
});

app.get('/task2C', (req, res) => {
  const username = getUsername(req.query.username)
  res.send(`${username}`);
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
