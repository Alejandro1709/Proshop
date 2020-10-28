import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import products from './data/products.js';
import connectToDB from './config/db.js';
import colors from 'colors';

const app = express();

dotenv.config();

connectToDB();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.send('Hello');
});

app.get('/api/v1/products', (req, res) => {
  res.status(200).json(products);
});

app.get('/api/v1/products/:id', (req, res) => {
  const product = products.find(p => p._id === req.params.id);

  res.status(200).json(product);
});

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} on port: ${port}`.yellow.bold
  )
);
