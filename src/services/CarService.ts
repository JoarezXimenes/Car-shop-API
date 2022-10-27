import { IModel } from '../interfaces/IModel';
import { ICar, CarZodSchema } from '../interfaces/ICar';
// import ErrorTypes from "../errors/catalog";
import { IService } from '../interfaces/IService';

class CarService implements IService<ICar> {
  private _car:IModel<ICar>;

  constructor(model: IModel<ICar>) {
    this._car = model;
  }

  async create(obj: unknown): Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);

    if (!parsed.success) throw parsed.error;

    const createdCar = await this._car.create(parsed.data);

    return createdCar;
  }
}

export default CarService;