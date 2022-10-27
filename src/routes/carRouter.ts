import { Router } from 'express';
import CarController from '../controllers/CarController';
import CarModel from '../models/Car';
import CarService from '../services/CarService';

const carRoutes = Router();

const carModel = new CarModel();
const carService = new CarService(carModel);
const carController = new CarController(carService);

carRoutes.post('/cars', (req, res) => carController.create(req, res));

export default carRoutes;
