import { ICar } from "../../interfaces/ICar";

const carMock:ICar = {
  model: "marea",
  year: 2000,
  color: "cinza",
  buyValue: 5000,
  doorsQty: 4,
  seatsQty: 5
};

const carMockWithId:ICar & { _id:string } = {
  _id: "6359f0c4e7c26f9e077d20c1",
  model: "marea",
  year: 2000,
  color: "cinza",
  buyValue: 5000,
  doorsQty: 4,
  seatsQty: 5
}

export { carMock, carMockWithId };