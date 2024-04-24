import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

//domain imports
import { Buyer } from 'src/domain/model/entities/buyer';
import { IBuyerRepository } from 'src/domain/repositories/buyer';

@Injectable()
export class MongoBuyerService implements IBuyerRepository {
  constructor(@InjectModel('Buyer') private buyerModel: Model<Buyer>) {}

  async findById(buyerId: string): Promise<Buyer> {
    return await this.buyerModel.findById(buyerId);
  }

  async create(buyer: Buyer): Promise<Buyer> {
    const newBuyer = new this.buyerModel(buyer);
    return await newBuyer.save();
  }

  async findAll(): Promise<Buyer[]> {
    return this.buyerModel.find().exec();
  }

  async update(id: string, updatedBuyer: Partial<Buyer>): Promise<Buyer> {
    return this.buyerModel.findByIdAndUpdate(id, updatedBuyer, { new: true });
  }

  async delete(buyerId: string): Promise<Buyer> {
    return this.buyerModel.findByIdAndDelete(buyerId);
  }
}
