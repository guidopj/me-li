import { Buyer } from '../model/entities/buyer';

export interface IBuyerRepository {
  findById(buyerId: string): Promise<Buyer | null>;
  findAll(): Promise<Array<Buyer> | null>;
  create(buyer: Buyer): Promise<Buyer>;
  update(buyerId: string, updatedBuyer: Partial<Buyer>): Promise<Buyer>;
  delete(buyerId: string): Promise<Buyer>;
}

export const IBuyerRepository = Symbol('IBuyerRepository');
