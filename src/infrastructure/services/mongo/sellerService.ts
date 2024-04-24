import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

//domain imports
import { Seller } from 'src/domain/model/entities/seller';
import { Product } from 'src/domain/model/entities/product';
import { ISellerRepository } from 'src/domain/repositories/seller';

@Injectable()
export class MongoSellerService implements ISellerRepository {
  constructor(@InjectModel('Seller') private sellerModel: Model<Seller>) {}

  async addProduct(seller: Seller, product: Product): Promise<Seller> {
    return await this.sellerModel.findOneAndUpdate(
      { _id: seller._id },
      {
        $push: { publishedProducts: product },
      },
      {
        new: true,
      },
    );
  }

  async findById(sellerId: string): Promise<Seller> {
    return await this.sellerModel.findById(sellerId).lean();
  }

  create(seller: Seller): Promise<Seller> {
    const newSeller = new this.sellerModel(seller);
    return newSeller.save();
  }

  findAll(): Promise<Seller[]> {
    return this.sellerModel.find().exec();
  }

  async updateProductStock(
    sellerId: string,
    productIndex: number,
    newStock: number,
  ): Promise<Seller> {
    const where = {
      ['publishedProducts.' + productIndex + '.stock']: newStock,
    };
    console.log('where', where);
    return await this.sellerModel.findOneAndUpdate(
      { _id: sellerId },
      { $set: where },
      {
        new: true,
      },
    );
  }

  async update(
    sellerId: string,
    updatedSeller: Partial<Seller>,
  ): Promise<Seller> {
    return await this.sellerModel.findOneAndUpdate(
      { _id: sellerId },
      updatedSeller,
      {
        new: true,
      },
    );
  }

  async delete(sellerId: string): Promise<Seller> {
    const sellerObjectId = new mongoose.Types.ObjectId(sellerId);
    return await this.sellerModel.findByIdAndDelete(sellerObjectId);
  }
}
