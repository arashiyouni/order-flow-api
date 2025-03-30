import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonModule } from '../auth/common.module';
import { OrderRepositoryService } from './repository/order-repository.service';

@Module({
  imports: [PrismaModule, CommonModule],
  controllers: [OrderController],
  providers: [OrderService, OrderRepositoryService],
})
export class OrderModule { }
