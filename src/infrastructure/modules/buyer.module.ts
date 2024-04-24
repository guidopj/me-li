import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

//infrastructure imports
import { BuyerController } from '../controllers/buyer/buyer.controller';
import BuyerSchema from 'src/infrastructure/repositories/mongo/schema/buyer.schema';
import { MongoBuyerService } from 'src/infrastructure/services/mongo/buyerService';

//application imports
import { BuyerService } from 'src/application/buyer/buyers.service';

//domain imports
import { IBuyerRepository } from 'src/domain/repositories/buyer';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Buyer', schema: BuyerSchema }]),
  ],
  controllers: [BuyerController],
  providers: [
    BuyerService,
    {
      useClass: MongoBuyerService,
      provide: IBuyerRepository,
    },
  ],
  exports: [
    {
      useClass: MongoBuyerService,
      provide: IBuyerRepository,
    },
  ],
})
export class BuyerModule {}
