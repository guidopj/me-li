//model imports

import { Product } from '../model/entities/product';
import { Seller } from '../model/entities/seller';

export interface ISellerRepository {
  findById(sellerId: string): Promise<Seller | null>;
  findAll(): Promise<Array<Seller> | null>;
  create(seller: Seller): Promise<Seller>;
  update(sellerId: string, updatedSeller: Partial<Seller>): Promise<Seller>;
  updateProductStock(
    sellerId: string,
    productIndex: number,
    newStock: number,
  ): Promise<Seller>;
  delete(sellerId: string): Promise<Seller>;
  addProduct(seller: Seller, product: Product): Promise<Seller>;
}

export const ISellerRepository = Symbol('ISellerRepository');
