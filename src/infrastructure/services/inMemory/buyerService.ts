//application imports
import { Injectable } from '@nestjs/common';

import { BuyerNotFoundException } from 'src/application/buyer/exceptions/buyerNotFoundException';
import { EmailNotValidException } from 'src/application/exceptions/emailNotValidException';

//domain imports
import { Buyer } from 'src/domain/model/entities/buyer';
import { IBuyerRepository } from 'src/domain/repositories/buyer';
import { validateEmail } from 'src/domain/validations';

const buyers: Buyer[] = [
  {
    id: '1',
    name: 'name1',
    surname: 'surname1',
    email: 'email1',
  },
  {
    id: '2',
    name: 'name2',
    surname: 'surname2',
    email: 'email2',
  },
  {
    id: '3',
    name: 'name3',
    surname: 'surname3',
    email: 'email3',
  },
];

//implements BuyerRepository declared in domain layer
//and finally by dependency injection include it in the corresponding use case in the application layer
@Injectable()
export class InMemoryBuyerService implements IBuyerRepository {
  async getById(buyerId: string): Promise<Buyer | null> {
    return buyers.find((buyer) => buyer.id === buyerId);
  }

  async getAll(): Promise<Buyer[]> {
    return buyers;
  }

  async create(buyer: Buyer): Promise<Buyer> {
    const isEmailValid = validateEmail(buyer.email);

    if (!isEmailValid) {
      throw new EmailNotValidException();
    }

    buyers.push(buyer);

    return buyer;
  }

  async update(
    buyerId: string,
    updatedBuyer: Partial<Buyer>,
  ): Promise<Buyer> | null {
    const buyerIdx = buyers.findIndex((buyer) => buyer.id === buyerId);

    if (buyerIdx < 0) {
      throw new BuyerNotFoundException();
    }

    const buyerToUpdate = buyers[buyerIdx];

    const newBuyer = {
      ...buyerToUpdate,
      ...updatedBuyer,
    };

    const isEmailValid = validateEmail(newBuyer.email);

    if (!isEmailValid) {
      throw new EmailNotValidException();
    }

    return newBuyer;
  }

  async findById(buyerId: string): Promise<Buyer> {
    return await buyers.find((buyer) => buyer.id === buyerId);
  }
  async findAll(): Promise<Buyer[]> {
    return await buyers;
  }
  async delete(buyerId: string): Promise<Buyer> {
    const buyerToDeleteIndex = buyers.findIndex(
      (buyer) => buyer.id === buyerId,
    );
    if (buyerToDeleteIndex > 0) {
      return await buyers[buyerToDeleteIndex];
    }

    return null;
  }
}
