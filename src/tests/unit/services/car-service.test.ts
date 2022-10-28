import { expect } from 'chai';
import sinon from 'sinon';
import CarModel from '../../../models/Car';
import { carMock, carMockWithId } from '../../mocks/carMock';
import CarService from '../../../services/CarService';
import { ZodError } from 'zod';

describe('Car Service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(() => {
    sinon.stub(carModel, 'create').resolves(carMockWithId);
    sinon.stub(carModel, 'read').resolves([carMockWithId]);
  });

  after(() => {
    sinon.restore();
  });

  describe('create', () => {
    it('successfully create a car', async () => {
      const newCar = await carService.create(carMock);
      expect(newCar).to.be.deep.eq(carMockWithId);
    });

    it('throw an error if car properties are invalid', async () => {
      try {
        await carService.create({} as any);
      } catch (error) {
        expect(error).to.be.instanceOf(ZodError);
      }
    });
  });

  describe('read', () => {
    it('returns an array of cars', async () => {
      const cars = await carService.read();
      expect(cars).to.have.deep.members([carMockWithId]);
    });

  });
});