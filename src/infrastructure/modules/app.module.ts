import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

//infrastructure imports
import { ProductModule } from './product.module';
import { BuyerModule } from './buyer.module';
import { SellerModule } from './seller.module';
import { ShoppingCartModule } from './shopping-cart.module';

//application imports

//domain imports

@Module({
  imports: [
    BuyerModule,
    ProductModule,
    SellerModule,
    ShoppingCartModule,
    //MongooseModule.forRoot('mongodb://127.0.0.1:27017/me_li'),
    MongooseModule.forRoot(
      'mongodb+srv://guidopujadas:AkJZwwivAyR2nXio@meli.uzqldzf.mongodb.net/',
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
