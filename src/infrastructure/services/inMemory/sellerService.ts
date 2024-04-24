import { Injectable } from '@nestjs/common';

//application imports

import { EmailNotValidException } from 'src/application/exceptions/emailNotValidException';
import { SellerNotFoundException } from 'src/application/seller/exceptions/sellerNotFoundException';
import { ProductNotValidException } from 'src/application/product/exceptions/productNotValidException';

//domain imports

import { Price } from 'src/domain/model/valueObjects/Price';
import { Seller } from 'src/domain/model/entities/seller';
import { ISellerRepository } from 'src/domain/repositories/seller';
import { validateEmail } from 'src/domain/validations';
import { isProductValid } from 'src/domain/model/validations/product';

const product = {
  _id: '1',
  name: 'name1',
  description: 'description1',
  price: new Price(1, '$'),
  stock: 1,
  sellerId: '1',
};

const sellers: Seller[] = [
  {
    _id: '1',
    businessName: 'business name1',
    email: 'email1',
    publishedProducts: [product],
  },
  {
    _id: '2',
    businessName: 'business name2',
    email: 'email2',
    publishedProducts: [product],
  },
  {
    _id: '3',
    businessName: 'business name3',
    email: 'email3',
    publishedProducts: [product],
  },
];

//implements sellerRepository declared in domain layer
//and finally by dependency injection include it in the corresponding use case in the application layer
@Injectable()
export class InMemorySellerService implements ISellerRepository {
  updateProductStock(
    sellerId: string,
    productIndex: number,
    newStock: number,
  ): Promise<Seller> {
    console.log('sellerId', sellerId);
    console.log('productIndex', productIndex);
    console.log('newStock', newStock);
    return null;
  }

  async addProduct(seller: Seller): Promise<Seller> {
    return seller;
  }

  async create(seller: Seller): Promise<Seller> {
    const isEmailValid = validateEmail(seller.email);

    if (!isEmailValid) {
      throw new EmailNotValidException();
    }

    sellers.push(seller);

    return seller;
  }

  async update(sellerId: string, newSeller: Seller): Promise<Seller> | null {
    const sellerIdx = sellers.findIndex((seller) => seller._id === sellerId);

    if (sellerIdx < 0) {
      throw new SellerNotFoundException();
    }

    const areProductsValid = newSeller.publishedProducts.every((product) =>
      isProductValid(product),
    );

    if (!areProductsValid) {
      throw new ProductNotValidException();
    }

    sellers[sellerIdx] = newSeller;

    return newSeller;
  }

  async findById(sellerId: string): Promise<Seller> {
    return await sellers.find((product) => product._id === sellerId);
  }
  async findAll(): Promise<Seller[]> {
    return await sellers;
  }
  async delete(sellerId: string): Promise<Seller> {
    const sellerToDeleteIndex = sellers.findIndex(
      (seller) => seller._id === sellerId,
    );
    if (sellerToDeleteIndex > 0) {
      return await sellers[sellerToDeleteIndex];
    }

    return null;
  }
}
