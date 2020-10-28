const express = require('express');
const products = require('./data/products');
const app = express();

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

app.listen(5000, () => console.log('Server is running on port: 5000'));
