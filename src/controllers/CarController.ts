import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

export default class CarController {
  constructor(private _service: IService<ICar>) {}

  public async create(req: Request, res: Response) {
    const { model, year, color, buyValue, seatsQty, doorsQty } = req.body;
    const car = { model, year, color, buyValue, seatsQty, doorsQty };

    const createdCar = await this._service.create(car);

    return res.status(201).json(createdCar);
  }

  public async read(req: Request, res: Response) {
    const cars = await this._service.read();

    return res.status(200).json(cars);
  }
}