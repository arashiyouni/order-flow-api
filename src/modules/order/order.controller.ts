import { Controller, Post, Body, UseGuards, Param, Patch, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, CreateOrderPerUserDto } from './dto/create-order.dto';
import { RolesGuard } from '../auth/guard/roles.guard';
import { AuthGuard } from '../auth/guard/auth.guard';
import { httpResponse } from 'src/common/interface/https-commons.interface';
import { OrderDto } from './dto/order.dto';
import { Roles } from 'src/common/decorator/decorator';
import { ROLE } from 'src/common/enum/global.enum';

@UseGuards(AuthGuard, RolesGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Roles(ROLE.USER)
  @Delete(':id')
  async GetOrder(@Param() orderId: OrderDto) {
    const fn = async () => {
      return await this.orderService.deleteOrder(orderId.id)
    }
    return await httpResponse(fn)
  }

  @Post()
  @Roles(ROLE.USER)
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    const fn = async () => {
      return this.orderService.create(createOrderDto)
    }
    return await httpResponse(fn)
  }

  @Patch('/item/:id')
  @Roles(ROLE.USER)
  async editOrder(
    @Param() orderId: OrderDto,
    @Body() editOrderDto: CreateOrderPerUserDto
  ) {
    const fn = async () => {
      return this.orderService.editOrder(orderId.id, editOrderDto)
    }
    return await httpResponse(fn)
  }
}
