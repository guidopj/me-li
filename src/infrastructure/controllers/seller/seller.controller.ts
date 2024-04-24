//infrastructure imports
import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Get,
} from '@nestjs/common';

//application imports
import { SellerService } from '../../../application/seller/seller.service';

//domain imports
import { Seller } from '../../../domain/model/entities/seller';
import { Product } from '../../../domain/model/entities/product';

@Controller('sellers')
export class SellerController {
  constructor(private readonly sellerManager: SellerService) {}

  @Post('create')
  async create(@Body() newSeller: Seller) {
    return await this.sellerManager.create(newSeller);
  }

  @Post('addProduct/:sellerId')
  async addProduct(@Param() params: any, @Body() product: Product) {
    return await this.sellerManager.addProduct(params.sellerId, product);
  }

  @Put('update/:id')
  async update(@Param() params: any, @Body() updatedSeller: Partial<Seller>) {
    return await this.sellerManager.update(params.id, updatedSeller);
  }

  @Delete('delete/:id')
  async delete(@Param() params: any) {
    return await this.sellerManager.delete(params.id);
  }

  @Get(':id')
  async findById(@Param() params: any): Promise<Seller | null> {
    return await this.sellerManager.findById(params.id);
  }

  @Get()
  async findAll(): Promise<Array<Seller> | null> {
    return await this.sellerManager.findAll();
  }
}
