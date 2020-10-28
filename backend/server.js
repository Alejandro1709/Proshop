import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectToDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import colors from 'colors';
import productRoutes from './routes/products.js';
const app = express();

dotenv.config();

connectToDB();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.send('Hello');
});

app.use('/api/v1/products', productRoutes);

app.use(notFound);

app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} on port: ${port}`.yellow.bold
  )
);
