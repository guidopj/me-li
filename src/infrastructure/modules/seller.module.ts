import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

//infrastructure imports
import { SellerController } from '../controllers/seller/seller.controller';
import SellerSchema from 'src/infrastructure/repositories/mongo/schema/seller.schema';
//import { InMemorySellerService } from 'src/infrastructure/services/inMemory/sellerService';
import { MongoSellerService } from '../services/mongo/sellerService';

//application imports
import { SellerService } from 'src/application/seller/seller.service';

//domain imports
import { ISellerRepository } from 'src/domain/repositories/seller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Seller', schema: SellerSchema }]),
  ],
  controllers: [SellerController],
  providers: [
    SellerService,
    {
      useClass: MongoSellerService,
      provide: ISellerRepository,
    },
  ],
  exports: [
    SellerService,
    {
      useClass: MongoSellerService,
      provide: ISellerRepository,
    },
  ],
})
export class SellerModule {}
