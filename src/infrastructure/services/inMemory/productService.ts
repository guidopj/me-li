//application imports

import { ProductNotValidException } from 'src/application/product/exceptions/productNotValidException';
import { ProductNotFoundException } from 'src/application/product/exceptions/productNotFoundException';

//domain imports

import { Product } from 'src/domain/model/entities/product';
import { Price } from 'src/domain/model/valueObjects/Price';

import { IProductRepository } from 'src/domain/repositories/product';
import { isProductValid } from 'src/domain/model/validations/product';
import { Injectable } from '@nestjs/common';

const products: Product[] = [
  {
    _id: '1',
    name: 'name1',
    description: 'description1',
    price: new Price(1, '$'),
    stock: 1,
    sellerId: '1',
  },
  {
    _id: '2',
    name: 'name2',
    description: 'description2',
    price: new Price(2, '$'),
    stock: 2,
    sellerId: '2',
  },
  {
    _id: '3',
    name: 'name3',
    description: 'description3',
    price: new Price(3, '$'),
    stock: 3,
    sellerId: '3',
  },
];

//implements ProductRepository declared in domain layer
//and finally by dependency injection include it in the corresponding use case in the application layer
@Injectable()
export class InMemoryProductService implements IProductRepository {
  async create(product: Product): Promise<Product> {
    const isValid = isProductValid(product);

    if (!isValid) {
      throw new ProductNotValidException();
    }

    products.push(product);

    return product;
  }

  async update(
    id: string,
    newProduct: Partial<Product>,
  ): Promise<Product> | null {
    const productIdx = products.findIndex((product) => product._id === id);

    if (productIdx < 0) {
      throw new ProductNotFoundException();
    }

    const productToUpdate = products[productIdx];

    const updatedProduct = {
      ...productToUpdate,
      ...newProduct,
    };

    const isValid = isProductValid(updatedProduct);

    if (!isValid) {
      throw new ProductNotValidException();
    }

    products[productIdx] = updatedProduct;

    return updatedProduct;
  }

  async findById(productId: string): Promise<Product> {
    return await products.find((product) => product._id === productId);
  }
  async findAll(): Promise<Product[]> {
    return await products;
  }
  async delete(productId: string): Promise<Product> {
    const productToDeleteIndex = products.findIndex(
      (product) => product._id === productId,
    );
    if (productToDeleteIndex > 0) {
      return products.splice(productToDeleteIndex, 1)[0];
    }

    return null;
  }
}
