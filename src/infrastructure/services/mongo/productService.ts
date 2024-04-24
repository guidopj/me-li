import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

//domain imports
import { Product } from 'src/domain/model/entities/product';
import { IProductRepository } from 'src/domain/repositories/product';

@Injectable()
export class MongoProductService implements IProductRepository {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  findById(productId: string): Promise<Product> {
    return this.productModel.findById(productId);
  }

  async create(product: Product): Promise<Product> {
    const newProduct = new this.productModel(product);

    return await newProduct.save();
  }

  findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  update(id: string, product: Partial<Product>): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, product, { new: true });
  }

  delete(buyerId: string): Promise<Product> {
    return this.productModel.findByIdAndDelete({ id: buyerId });
  }
}
