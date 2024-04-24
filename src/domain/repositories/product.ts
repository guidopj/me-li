import { Product } from '../model/entities/product';

export interface IProductRepository {
  findById(productId: string): Promise<Product | null>;
  findAll(): Promise<Array<Product> | null>;
  create(buyer: Product): Promise<Product>;
  update(id: string, buyer: Partial<Product>): Promise<Product>;
  delete(buyerId: string): Promise<Product>;
}

export const IProductRepository = Symbol('IProductRepository');
