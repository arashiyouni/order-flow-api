import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
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
  @Get(':orderId')
  async GetOrder(@Param() orderId: OrderDto) {
    const fn = async () => {
      return await this.orderService.deleteOrder(orderId)
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
}
