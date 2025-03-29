import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from '../dto/create-order.dto';

@Injectable()
export class OrderRepositoryService {
    constructor(private prisma: PrismaService) { }

    async createOrder(order: CreateOrderDto) {
        return await this.prisma.order.create({
            data: {
                scheduleDeliveryDate: order.scheduleDeliveryDate,
                name: order.name,
                lastname: order.lastname,
                email: order.email,
                phone: order.phone,
                deliveryAddress: order.deliveryAddress,
                state: order.name,
                city: order.city,
                instructions: order.instructions,
                OrderPerUser: {
                    create: order.OrderPerUser
                }
            },
            include: { OrderPerUser: true }
        })

    }

    async findOrder(id: string) {
        return await this.prisma.orderPerUser.findUnique({
            where: {
                id: id
            }
        })
    }

    async deleteOrder(id: string) {
        return await this.prisma.orderPerUser.findUnique({
            where: { id: id }
        })
    }
}
