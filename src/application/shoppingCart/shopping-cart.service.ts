import { Inject, Injectable } from '@nestjs/common';

//application imports

//domain imports
import { CartProduct } from 'src/domain/model/valueObjects/cartProduct';
import { IShoppingCartRepository } from 'src/domain/repositories/shoppingCart';
import { SellerService } from '../seller/seller.service';
import { ShoppingCartNotFoundException } from './exceptions/ShoppingCartNotFoundException';
import { ProductNotFoundException } from '../product/exceptions/productNotFoundException';
import { AmountNotEnoughException } from '../product/exceptions/amountNotEnoughException';

@Injectable()
export class ShoppingCartService {
  constructor(
    @Inject(IShoppingCartRepository)
    private readonly shoppingCartRepository: IShoppingCartRepository,
    private readonly sellerService: SellerService,
  ) {}

  async create(buyerId: string) {
    return await this.shoppingCartRepository.create(buyerId);
  }

  async addProduct(
    buyerId: string,
    newProduct: CartProduct,
  ): Promise<CartProduct> {
    const buyerProducts: Array<CartProduct> =
      await this.shoppingCartRepository.getProductsByBuyer(buyerId);

    const foundProduct = buyerProducts.find(
      (product) => product.productId == newProduct.productId,
    );

    if (foundProduct) {
      const newAmount = foundProduct.amount + newProduct.amount;

      Object.assign(foundProduct, { amount: newAmount });

      return await this.shoppingCartRepository.updateCart(
        buyerId,
        foundProduct,
      );
    }

    return await this.shoppingCartRepository.addProduct(buyerId, newProduct);
  }

  async reduceProductAmount(buyerId: string, reducedProduct: CartProduct) {
    const buyerProducts: Array<CartProduct> =
      await this.shoppingCartRepository.getProductsByBuyer(buyerId);

    const foundProduct = buyerProducts.find(
      (product) => product.productId == reducedProduct.productId,
    );

    const newAmount = foundProduct.amount - reducedProduct.amount;

    if (newAmount === 0) {
      return await this.shoppingCartRepository.deleteProductFromBuyer(
        buyerId,
        reducedProduct,
      );
    }

    Object.assign(foundProduct, { amount: newAmount });

    if (foundProduct) {
      return this.shoppingCartRepository.updateCart(buyerId, foundProduct);
    }
  }

  async delete(id: string) {
    this.shoppingCartRepository.delete(id);
  }

  async processPurchase(buyerId: string): Promise<CartProduct[]> {
    const cart = await this.shoppingCartRepository.getCartByBuyerId(buyerId);
    const purchased = [];
    if (cart) {
      cart.cartProducts.map(async (cartProduct) => {
        const seller = await this.sellerService.findById(cartProduct.sellerId);

        const sellerProductIdx = seller.publishedProducts.findIndex(
          (published) => {
            return published._id.toString() == cartProduct.productId.toString();
          },
        );

        if (sellerProductIdx >= 0) {
          const sellerProduct = seller.publishedProducts[sellerProductIdx];
          if (sellerProduct.stock >= cartProduct.amount) {
            const newStock = sellerProduct.stock - cartProduct.amount;

            await this.sellerService.updateProductStock(
              seller._id,
              sellerProductIdx,
              newStock,
            );
            purchased.push(cartProduct);
          } else {
            throw new AmountNotEnoughException(
              sellerProduct.stock,
              cartProduct.amount,
            );
          }
        } else {
          throw new ProductNotFoundException();
        }
      });
      //this.shoppingCartRepository.delete(cart.buyerId);
    } else {
      throw new ShoppingCartNotFoundException();
    }
    return purchased;
  }
}
