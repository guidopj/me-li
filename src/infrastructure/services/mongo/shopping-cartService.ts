import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ShoppingCartNotFoundException } from 'src/application/shoppingCart/exceptions/ShoppingCartNotFoundException';
import { ShoppingCart } from 'src/domain/model/aggregates/shoppingCart';
import { CartProduct } from 'src/domain/model/valueObjects/cartProduct';

import { IShoppingCartRepository } from 'src/domain/repositories/shoppingCart';

@Injectable()
export class MongoShoppingCartService implements IShoppingCartRepository {
  constructor(
    @InjectModel('ShoppingCart') private shoppingCartModel: Model<ShoppingCart>,
    @InjectModel('CartProduct') private cartProductModel: Model<CartProduct>,
  ) {}

  async create(buyerId: string): Promise<ShoppingCart> {
    const buyerObjectId = new mongoose.Types.ObjectId(buyerId);
    const newCart = {
      buyerObjectId,
      cartProducts: [],
    };
    const createdCart = new this.shoppingCartModel(newCart);

    return await createdCart.save();
  }

  async delete(buyerId: string): Promise<ShoppingCart> {
    const buyerObjectId = new mongoose.Types.ObjectId(buyerId);
    return await this.shoppingCartModel.findOneAndDelete(buyerObjectId);
  }

  async addProduct(
    buyerId: string,
    product: CartProduct,
  ): Promise<CartProduct> {
    const newCartProduct = new this.cartProductModel(product);

    const cart = await this.shoppingCartModel.findOne({
      buyerId,
    });

    if (cart) {
      cart.cartProducts.push(newCartProduct);
    }

    await cart.save();
    return newCartProduct;
  }

  async getProductsByBuyer(buyerId: string): Promise<CartProduct[]> {
    const buyer = await this.shoppingCartModel
      .findOne({
        buyerId,
      })
      .exec();

    return buyer.cartProducts;
  }

  async findCartByBuyerId(buyerId: string) {
    return await this.shoppingCartModel.findOne({
      buyerId,
    });
  }

  async updateCart(
    buyerId: string,
    products: CartProduct,
  ): Promise<CartProduct> {
    const cart = await this.findCartByBuyerId(buyerId);

    if (cart) {
      return await this.shoppingCartModel.findOneAndUpdate(
        { buyerId },
        { cartProducts: products },
        {
          new: true,
        },
      );
    }

    throw new ShoppingCartNotFoundException();
  }

  async deleteProductFromBuyer(
    buyerId: string,
    productToDelete: CartProduct,
  ): Promise<CartProduct> {
    const cart = await this.shoppingCartModel.findOne({
      buyerId,
    });

    const products = cart.cartProducts.filter(
      (product) => product.productId != productToDelete.productId,
    );

    return this.shoppingCartModel.findOneAndUpdate(
      { buyerId },
      { cartProducts: products },
      { new: true },
    );
  }

  async getCartByBuyerId(buyerId: string): Promise<ShoppingCart> {
    return await this.shoppingCartModel.findOne({
      buyerId,
    });
  }
}
