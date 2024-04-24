import { Inject, Injectable } from '@nestjs/common';

//application imports
import { BuyerNotFoundException } from './exceptions/buyerNotFoundException';
import { EmailNotValidException } from 'src/application/exceptions/emailNotValidException';

//domain imports
import { Buyer } from 'src/domain/model/entities/buyer';
import { IBuyerRepository } from '../../domain/repositories/buyer';
import { validateEmail } from 'src/domain/validations';

@Injectable()
export class BuyerService {
  constructor(
    @Inject(IBuyerRepository)
    private readonly buyerRepository: IBuyerRepository,
  ) {}

  async create(newBuyer: Buyer) {
    const validatedEmail = validateEmail(newBuyer.email);

    if (!validatedEmail) {
      throw new EmailNotValidException();
    }

    return await this.buyerRepository.create(newBuyer);
  }

  async findById(userId: string): Promise<Buyer | null> {
    const buyer = await this.buyerRepository.findById(userId);

    if (!buyer) {
      throw new BuyerNotFoundException();
    }
    return buyer;
  }

  async findAll(): Promise<Array<Buyer>> {
    return await this.buyerRepository.findAll();
  }

  async update(buyerId: string, updatedBuyer: Partial<Buyer>): Promise<Buyer> {
    return await this.buyerRepository.update(buyerId, updatedBuyer);
  }

  async delete(buyerId: string): Promise<Buyer> {
    return await this.buyerRepository.delete(buyerId);
  }
}
