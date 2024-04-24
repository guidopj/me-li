import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MongoShoppingCartService } from 'src/infrastructure/services/mongo/shopping-cartService';
import { IShoppingCartRepository } from 'src/domain/repositories/shoppingCart';
import ShoppingCartSchema from 'src/infrastructure/repositories/mongo/schema/shoppingCart.schema';
import CartProductSchema from '../repositories/mongo/schema/cartProduct.schema';
import { ShoppingCartService } from 'src/application/shoppingCart/shopping-cart.service';
import { ShoppingCartController } from '../controllers/shoppingCart/shopping-cart.controller';
import { SellerModule } from './seller.module';

@Module({
  imports: [
    SellerModule,
    MongooseModule.forFeature([
      { name: 'ShoppingCart', schema: ShoppingCartSchema },
      { name: 'CartProduct', schema: CartProductSchema },
    ]),
  ],
  controllers: [ShoppingCartController],
  providers: [
    ShoppingCartService,
    {
      useClass: MongoShoppingCartService,
      provide: IShoppingCartRepository,
    },
  ],
  exports: [
    {
      useClass: MongoShoppingCartService,
      provide: IShoppingCartRepository,
    },
  ],
})
export class ShoppingCartModule {}
