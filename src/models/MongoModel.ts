import { Model, isValidObjectId } from 'mongoose';
import { IModel } from '../interfaces/IModel';

abstract class MongoModel<T> implements IModel<T> {
  protected _model: Model<T>;

  constructor(model:Model<T>) {
    this._model = model;
  }

  async create(obj: T): Promise<T> {
    const created = await this._model.create({ ...obj });
    return created;
  }
  async read(): Promise<T[]> {
    const documentArray = await this._model.find({});
    return documentArray;
  }
  async readOne(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error('InvalidMongoId');
    const foundDocument = await this._model.findById(_id);
    return foundDocument;
  }
  async update(_id: string, obj: Partial<T>): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error('InvalidMongoId');
    const updatedDocument = this._model.findByIdAndUpdate(_id, obj, { new: true });
    return updatedDocument;
  }
  async delete(_id: string): Promise<boolean> {
    if (!isValidObjectId(_id)) throw Error('InvalidMongoId');
    const documentDeleted = await this._model.deleteOne({ _id });
    if (documentDeleted.deletedCount === 0) return false;
    return true;
  }
}

export default MongoModel;