import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectToDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/products.js';
import userRoutes from './routes/users';

dotenv.config();

connectToDB();

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/products', productRoutes);
app.use('/api/v1/auth', userRoutes);

app.use(notFound);

app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} on port: ${port}`.yellow.bold
  )
);
