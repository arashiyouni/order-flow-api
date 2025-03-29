import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto, CreateOrderResponse } from './dto/create-order.dto';
import { OrderRepositoryService } from './repository/order-repository.service';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {

  constructor(private orderRepository: OrderRepositoryService) { }

  async create(createOrderDto: CreateOrderDto): Promise<CreateOrderResponse> {

    const order = await this.orderRepository.createOrder(createOrderDto)

    if (!order) throw new BadRequestException('Ha ocurrido un error al guardar la orden')

    const getOrdersId = order.OrderPerUser.map((ids) => ids.orderId)

    return {
      scheduleDeliveryDate: order.scheduleDeliveryDate,
      name: `${order.name} ${order.lastname}`,
      orderId: getOrdersId
    }
  }

  async deleteOrder(order: OrderDto) {

    const isExistOrder = await this.orderRepository.findOrder(order.orderId)

    if (!isExistOrder) throw new NotFoundException('No se ha encontrado la orden')

    const deleteOrder = await this.orderRepository.deleteOrder(order.orderId)

    if (!deleteOrder) throw new BadRequestException('Ha ocurrido un error al eliminar la orden')

    return {
      message: 'Orden Eliminada',
      orderId: deleteOrder.id,
      description: deleteOrder.description
    }
  }


}
