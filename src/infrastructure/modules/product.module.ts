import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

//infrastructure imports
import { ProductController } from '../controllers/product/product.controller';
import ProductSchema from 'src/infrastructure/repositories/mongo/schema/product.schema';
//import { InMemoryProductService } from 'src/infrastructure/services/inMemory/productService';
import { MongoProductService } from '../services/mongo/productService';

//application imports
import { ProductService } from 'src/application/product/products.service';

//domain imports
import { IProductRepository } from 'src/domain/repositories/product';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      useClass: MongoProductService,
      provide: IProductRepository,
    },
  ],
  exports: [
    {
      useClass: MongoProductService,
      provide: IProductRepository,
    },
  ],
})
export class ProductModule {}
