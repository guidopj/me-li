import { MongoProductService } from 'src/infrastructure/services/mongo/productService';
import { Product } from 'src/domain/model/entities/product';

import { ProductService } from '../../src/application/product/products.service';
import { ProductController } from '../../src/infrastructure/controllers/product/product.controller';
import { Price } from '../../src/domain/model/valueObjects/Price';

describe('productController', () => {
  let productController: ProductController;
  let productService: ProductService;
  let mongoProductService: MongoProductService;

  beforeEach(() => {
    productService = new ProductService(mongoProductService);
    productController = new ProductController(productService);
  });

  describe('product controller', () => {
    it('(findById) should return a product which id matches', async () => {
      const product: Product = {
        id: 'T6626b0e63eecaee5202b0db7',
        name: 'new product1',
        description: 'description1',
        price: new Price(0, ''),
        stock: 1,
        sellerId: '1',
      };

      jest
        .spyOn(productService, 'findById')
        .mockImplementation(async () => product);

      expect(
        await productController.findById('T6626b0e63eecaee5202b0db7'),
      ).toBe(product);
    });

    it('(findAll) should return all available products', async () => {
      const products: Product[] = [
        {
          id: 'T6626b0e63eecaee5202b0db7',
          name: 'new product1',
          description: 'description1',
          price: new Price(0, ''),
          stock: 1,
          sellerId: '1',
        },
        {
          id: 'T6626b0e63eecaee5202b0db8',
          name: 'new product2',
          description: 'description2',
          price: new Price(0, ''),
          stock: 1,
          sellerId: '1',
        },
        {
          id: 'T6626b0e63eecaee5202b0db9',
          name: 'new product3',
          description: 'description3',
          price: new Price(0, ''),
          stock: 1,
          sellerId: '1',
        },
      ];

      jest
        .spyOn(productService, 'findAll')
        .mockImplementation(async () => products);

      expect(await productController.findAll()).toBe(products);
    });

    it('(create) should return a new created product', async () => {
      const createdProduct: Product = {
        id: 'T6626b0e63eecaee5202b0db7',
        name: 'new created product1',
        description: 'description1',
        price: new Price(0, ''),
        stock: 1,
        sellerId: '1',
      };

      jest
        .spyOn(productService, 'create')
        .mockImplementation(async () => createdProduct);

      expect(await productController.create(createdProduct)).toBe(
        createdProduct,
      );
    });
  });

  it('(update) should return an updated product', async () => {
    const updatedProduct: Partial<Product> = {
      name: 'updated created product1',
    };

    const newProduct: Product = {
      id: 'T6626b0e63eecaee5202b0db7',
      name: 'updated created product1',
      description: 'description1',
      price: new Price(0, ''),
      stock: 1,
      sellerId: '1',
    };

    jest
      .spyOn(productService, 'update')
      .mockImplementation(async () => newProduct);

    expect(
      await productController.update(
        'T6626b0e63eecaee5202b0db7',
        updatedProduct,
      ),
    ).toBe(newProduct);
  });

  it('(delete) should return deleted product', async () => {
    const deletedProduct: Product = {
      id: 'T6626b0e63eecaee5202b0db7',
      name: 'updated created product1',
      description: 'description1',
      price: new Price(0, ''),
      stock: 1,
      sellerId: '1',
    };

    jest
      .spyOn(productService, 'delete')
      .mockImplementation(async () => deletedProduct);

    expect(await productController.delete('T6626b0e63eecaee5202b0db7')).toBe(
      deletedProduct,
    );
  });
});
