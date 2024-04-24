//infrastructure imports
import { Body, Controller, Delete, Param, Post } from '@nestjs/common';

//application imports
import { ShoppingCartService } from 'src/application/shoppingCart/shopping-cart.service';
import { CartProduct } from 'src/domain/model/valueObjects/cartProduct';

@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartManager: ShoppingCartService) {}

  @Post(':buyerId')
  async create(@Param() params: any) {
    return await this.shoppingCartManager.create(params.buyerId);
  }

  @Post('addProduct/:buyerId')
  async addProduct(@Param() params: any, @Body() newCartProduct: CartProduct) {
    return await this.shoppingCartManager.addProduct(
      params.buyerId,
      newCartProduct,
    );
  }

  @Post('reduceProduct/:buyerId')
  async reduceProduct(
    @Param() params: any,
    @Body() newCartProduct: CartProduct,
  ) {
    return await this.shoppingCartManager.reduceProductAmount(
      params.buyerId,
      newCartProduct,
    );
  }

  @Post('purchase/:buyerId')
  async purchase(@Param() params: any): Promise<CartProduct[]> {
    return this.shoppingCartManager.processPurchase(params.buyerId);
  }

  @Delete('delete/:id')
  async delete(@Param() params: any) {
    return await this.shoppingCartManager.delete(params.id);
  }
}
