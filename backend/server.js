import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectToDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/products.js';
import colors from 'colors';
import userRoutes from './routes/users.js';
import orderRoutes from './routes/orders.js';
const app = express();

dotenv.config();

connectToDB();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.get('/api/config/paypal', (req, res) => {
  res.status(200).send(process.env.PAYPAL_CLIENT_ID);
});

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} on port: ${port}`.yellow.bold
  )
);
