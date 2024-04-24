//infrastructure imports
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

//domain imports
import { Product } from '../../../domain/model/entities/product';

//application imports
import { ProductService } from '../../../application/product/products.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productManager: ProductService) {}

  @Post('create')
  async create(@Body() newProduct: Product) {
    return await this.productManager.create(newProduct);
  }

  @Get(':id')
  async findById(@Param() params: any): Promise<Product | null> {
    return await this.productManager.findById(params.id);
  }

  @Get()
  async findAll(): Promise<Array<Product> | null> {
    return await this.productManager.findAll();
  }

  @Put('update/:id')
  async update(@Param() params: any, @Body() updatedProduct: Partial<Product>) {
    return await this.productManager.update(params.id, updatedProduct);
  }

  @Delete('delete/:id')
  async delete(@Param() params: any) {
    return await this.productManager.delete(params.id);
  }
}
