import express from 'express';
import cors from 'cors';
import summa from './summa';

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

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
