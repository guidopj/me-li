import { Seller } from 'src/domain/model/entities/seller';

import { SellerService } from '../../src/application/seller/seller.service';
import { SellerController } from '../../src/infrastructure/controllers/seller/seller.controller';
import { MongoSellerService } from 'src/infrastructure/services/mongo/sellerService';

describe('sellerController', () => {
  let sellerController: SellerController;
  let sellerService: SellerService;
  let mongoSellerService: MongoSellerService;

  beforeEach(() => {
    sellerService = new SellerService(mongoSellerService);
    sellerController = new SellerController(sellerService);
  });

  describe('seller controller', () => {
    it('(findById) should return a seller which id matches', async () => {
      const seller: Seller = {
        id: 'T6626b0e63eecaee5202b0db7',
        businessName: 'businessName1',
        email: 'business@email.com',
        publishedProducts: [],
      };

      jest
        .spyOn(sellerService, 'findById')
        .mockImplementation(async () => seller);

      expect(await sellerController.findById('T6626b0e63eecaee5202b0db7')).toBe(
        seller,
      );
    });

    it('(findAll) should return all available sellers', async () => {
      const sellers: Seller[] = [
        {
          id: 'T6626b0e63eecaee5202b0db7',
          businessName: 'businessName1',
          email: 'business@email.com',
          publishedProducts: [],
        },
        {
          id: 'T6626b0e63eecaee5202b0db7',
          businessName: 'businessName2',
          email: 'business2@email.com',
          publishedProducts: [],
        },
        {
          id: 'T6626b0e63eecaee5202b0db7',
          businessName: 'businessName3',
          email: 'business3@email.com',
          publishedProducts: [],
        },
      ];

      jest
        .spyOn(sellerService, 'findAll')
        .mockImplementation(async () => sellers);

      expect(await sellerController.findAll()).toBe(sellers);
    });

    it('(create) should return a new created seller', async () => {
      const createdSeller: Seller = {
        id: 'T6626b0e63eecaee5202b0db7',
        businessName: 'businessName3',
        email: 'business3@email.com',
        publishedProducts: [],
      };

      jest
        .spyOn(sellerService, 'create')
        .mockImplementation(async () => createdSeller);

      expect(await sellerController.create(createdSeller)).toBe(createdSeller);
    });
  });

  it('(update) should return an updated Seller', async () => {
    const updatedSeller: Partial<Seller> = {
      businessName: 'updated created Seller1',
    };

    const newSeller: Seller = {
      id: 'T6626b0e63eecaee5202b0db7',
      businessName: 'businessName3',
      email: 'business3@email.com',
      publishedProducts: [],
    };

    jest
      .spyOn(sellerService, 'update')
      .mockImplementation(async () => newSeller);

    expect(
      await sellerController.update('T6626b0e63eecaee5202b0db7', updatedSeller),
    ).toBe(newSeller);
  });

  it('(delete) should return deleted seller', async () => {
    const deletedSeller: Seller = {
      id: 'T6626b0e63eecaee5202b0db7',
      businessName: 'businessName3',
      email: 'business3@email.com',
      publishedProducts: [],
    };

    jest
      .spyOn(sellerService, 'delete')
      .mockImplementation(async () => deletedSeller);

    expect(await sellerController.delete('T6626b0e63eecaee5202b0db7')).toBe(
      deletedSeller,
    );
  });
});
