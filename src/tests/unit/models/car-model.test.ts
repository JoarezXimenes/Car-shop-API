import { expect } from 'chai';
import sinon from 'sinon';
import CarModel from '../../../models/Car';
import { Model } from 'mongoose';
import { carMock, carMockWithId } from '../../mocks/carMock';

describe('Car Model', () => {
  const carModel = new CarModel();

  before(() => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'findById').resolves(carMockWithId);
    sinon.stub(Model, 'find').resolves([carMockWithId]);
    sinon.stub(Model, 'findByIdAndDelete').resolves(carMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockWithId);
  });

  after(() => {
    sinon.restore();
  });

  describe('create', () => {
    it('successfully create a car', async () => {
      const newCar = await carModel.create(carMock);
      expect(newCar).to.be.deep.eq(carMockWithId);
    });
  });

  describe('readOne', () => {
    it('successfully find a car that exists', async () => {
      const car = await carModel.readOne("6359f0c4e7c26f9e077d20c1");
      expect(car).to.be.deep.eq(carMockWithId);
    });

    it('_id not found', async () => {
      try {
        await carModel.readOne("invalidId");
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidMongoId');        
      }
    });
  });

  describe('read', () => {
    it('successfully returns an array of cars', async () => {
      const cars = await carModel.read();
      expect(cars).to.have.deep.members([carMockWithId]);
    });
  });

  describe('delete', () => {
    it('successfully delete a car', async () => {
      const deletedCar = await carModel.delete("6359f0c4e7c26f9e077d20c1");
      expect(deletedCar).to.be.deep.eq(carMockWithId);
    });

    it('_id not found', async () => {
      try {
        await carModel.delete("invalidId");
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidMongoId');        
      }
    });
  });

  describe('update', () => {
    it('successfully update a car', async () => {
      const updatedCar = await carModel.update("6359f0c4e7c26f9e077d20c1", carMock);
      expect(updatedCar).to.be.deep.eq(carMockWithId);
    });

    it('_id not found', async () => {
      try {
        await carModel.update("invalidId", carMock);
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidMongoId');        
      }
    });
  });
});