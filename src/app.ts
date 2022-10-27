import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/errorMiddleware';
import carRoutes from './routes/carRouter';

const app = express();
app.use(express.json());

app.use(carRoutes);

app.use(errorHandler);

export default app;