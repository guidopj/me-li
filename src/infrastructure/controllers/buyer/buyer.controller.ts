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

//application imports
import { BuyerService } from '../../../application/buyer/buyers.service';

//domain imports
import { Buyer } from '../../../domain/model/entities/buyer';

@Controller('buyers')
export class BuyerController {
  constructor(private readonly buyersManager: BuyerService) {}

  @Post('create')
  async create(@Body() newBuyer: Buyer) {
    return await this.buyersManager.create(newBuyer);
  }

  @Get(':id')
  async findById(@Param() params: any): Promise<Buyer | null> {
    return await this.buyersManager.findById(params.id);
  }

  @Get()
  async findAll(): Promise<Array<Buyer> | null> {
    return await this.buyersManager.findAll();
  }

  @Put('update/:id')
  async update(
    @Param() params: any,
    @Body() updatedBuyer: Partial<Buyer>,
  ): Promise<Buyer> {
    return await this.buyersManager.update(params.id, updatedBuyer);
  }

  @Delete('delete/:id')
  async delete(@Param() params: any) {
    return await this.buyersManager.delete(params.id);
  }
}
