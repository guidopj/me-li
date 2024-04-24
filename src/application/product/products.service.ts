import { Inject, Injectable } from '@nestjs/common';

//application imports
import { SellerNotFoundException } from '../seller/exceptions/sellerNotFoundException';

//domain imports
import { Product } from '../../domain/model/entities/product';
import { IProductRepository } from '../../domain/repositories/product';
import { validateObjectId } from 'src/domain/validations';

@Injectable()
export class ProductService {
  constructor(
    @Inject(IProductRepository)
    private readonly productRepository: IProductRepository,
  ) {}

  async create(newProduct: Product) {
    const isSellerIdValid = validateObjectId(newProduct.sellerId);

    if (!isSellerIdValid) {
      throw new SellerNotFoundException();
    }
    return await this.productRepository.create(newProduct);
  }

  async findById(id: string) {
    return await this.productRepository.findById(id);
  }

  async findAll() {
    return await this.productRepository.findAll();
  }

  async update(id: string, updatedProduct: Partial<Product>) {
    return await this.productRepository.update(id, updatedProduct);
  }

  async delete(productId: string) {
    return await this.productRepository.delete(productId);
  }
}
