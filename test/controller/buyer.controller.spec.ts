import { MongoBuyerService } from 'src/infrastructure/services/mongo/buyerService';
import { Buyer } from 'src/domain/model/entities/buyer';

import { BuyerService } from '../../src/application/buyer/buyers.service';
import { BuyerController } from '../../src/infrastructure/controllers/buyer/buyer.controller';

describe('buyerController', () => {
  let buyerController: BuyerController;
  let buyerService: BuyerService;
  let mongoBuyerService: MongoBuyerService;

  beforeEach(() => {
    buyerService = new BuyerService(mongoBuyerService);
    buyerController = new BuyerController(buyerService);
  });

  describe('buyer controller', () => {
    it('(findById) should return a buyer which id matches', async () => {
      const buyer: Buyer = {
        id: 'T6626b0e63eecaee5202b0db7',
        name: 'new buyer1',
        surname: 'new surnamr1',
        email: 'newBuyer@email.coom',
      };

      jest
        .spyOn(buyerService, 'findById')
        .mockImplementation(async () => buyer);

      expect(await buyerController.findById('T6626b0e63eecaee5202b0db7')).toBe(
        buyer,
      );
    });

    it('(findAll) should return all available buyers', async () => {
      const buyers: Buyer[] = [
        {
          id: 'T6626b0e63eecaee5202b0db7',
          name: 'new buyer1',
          surname: 'new surnamr1',
          email: 'newBuyer1@email.coom',
        },
        {
          id: 'T6626b0e63eecaee5202b0db8',
          name: 'new buyer2',
          surname: 'new surnamr2',
          email: 'newBuyer2@email.coom',
        },
        {
          id: 'T6626b0e63eecaee5202b0db9',
          name: 'new buyer3',
          surname: 'new surnamr3',
          email: 'newBuyer3@email.coom',
        },
      ];
      jest
        .spyOn(buyerService, 'findAll')
        .mockImplementation(async () => buyers);

      expect(await buyerController.findAll()).toBe(buyers);
    });

    it('(create) should return a new created buyer', async () => {
      const createdBuyer: Buyer = {
        id: 'T6626b0e63eecaee5202b0db7',
        name: 'new created buyer1',
        surname: 'new created surnamr1',
        email: 'newCreatedBuyer@email.coom',
      };

      jest
        .spyOn(buyerService, 'create')
        .mockImplementation(async () => createdBuyer);

      expect(await buyerController.create(createdBuyer)).toBe(createdBuyer);
    });
  });

  it('(update) should return an updated buyer', async () => {
    const updatedBuyer: Partial<Buyer> = {
      name: 'updated created buyer1',
    };

    const newBuyer: Buyer = {
      id: 'T6626b0e63eecaee5202b0db7',
      name: 'updated created buyer1',
      surname: 'new created surnamr1',
      email: 'newCreatedBuyer@email.coom',
    };

    jest.spyOn(buyerService, 'update').mockImplementation(async () => newBuyer);

    expect(
      await buyerController.update('T6626b0e63eecaee5202b0db7', updatedBuyer),
    ).toBe(newBuyer);
  });

  it('(delete) should return deleted buyer', async () => {
    const deletedBuyer: Buyer = {
      id: 'T6626b0e63eecaee5202b0db7',
      name: 'updated created buyer1',
      surname: 'new created surnamr1',
      email: 'newCreatedBuyer@email.coom',
    };

    jest
      .spyOn(buyerService, 'delete')
      .mockImplementation(async () => deletedBuyer);

    expect(await buyerController.delete('T6626b0e63eecaee5202b0db7')).toBe(
      deletedBuyer,
    );
  });
});
