import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto, CreateOrderPerUserDto, CreateOrderResponse } from './dto/create-order.dto';
import { OrderRepositoryService } from './repository/order-repository.service';
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

  async deleteOrder(order: string) {

    const isExistOrder = await this.orderRepository.findOrder(order)

    if (!isExistOrder) throw new NotFoundException('No se ha encontrado la orden')

    const deleteOrder = await this.orderRepository.deleteOrder(order)

    if (!deleteOrder) throw new BadRequestException('Ha ocurrido un error al eliminar la orden')

    return {
      message: 'Orden Eliminada',
      orderId: deleteOrder.id,
      description: deleteOrder.description
    }
  }

  async editOrder(orderId: string, order: CreateOrderPerUserDto) {
    const isExistOrder = await this.orderRepository.findOrder(orderId)

    if (!isExistOrder) throw new NotFoundException('No se ha encontrado la orden')

    const updateOrder = await this.orderRepository.updateOrder(orderId, order)

    if (!updateOrder) throw new BadRequestException('No se ha actualizado el detalle de la orden')

    return updateOrder
  }

}
