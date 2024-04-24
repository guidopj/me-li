import { Inject, Injectable } from '@nestjs/common';

//application imports
import { EmailNotValidException } from '../exceptions/emailNotValidException';

//domain imports
import { Seller } from 'src/domain/model/entities/seller';
import { ISellerRepository } from '../../domain/repositories/seller';
import { Product } from 'src/domain/model/entities/product';
import { validateEmail } from 'src/domain/validations';

@Injectable()
export class SellerService {
  constructor(
    @Inject(ISellerRepository)
    private readonly sellerRepository: ISellerRepository,
  ) {}

  async create(newSeller: Seller) {
    const validatedEmail = validateEmail(newSeller.email);

    if (!validatedEmail) {
      throw new EmailNotValidException();
    }
    return await this.sellerRepository.create(newSeller);
  }

  async addProduct(sellerId: string, product: Product): Promise<Seller> {
    const seller = await this.sellerRepository.findById(sellerId);

    if (seller) {
      return await this.sellerRepository.addProduct(seller, product);
    }

    return null;
  }

  async update(sellerId: string, updatedSeller: Partial<Seller>) {
    return await this.sellerRepository.update(sellerId, updatedSeller);
  }

  async updateProductStock(
    sellerId: string,
    productIndex: number,
    newStock: number,
  ) {
    return await this.sellerRepository.updateProductStock(
      sellerId,
      productIndex,
      newStock,
    );
  }

  async delete(sellerId: string) {
    return await this.sellerRepository.delete(sellerId);
  }

  async findById(sellerId: string) {
    return await this.sellerRepository.findById(sellerId);
  }

  async findAll() {
    return await this.sellerRepository.findAll();
  }
}
