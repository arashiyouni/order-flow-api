import { Controller, Post, Body, UseGuards, Param, Patch, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, CreateOrderPerUserDto, CreateOrderResponse } from './dto/create-order.dto';
import { RolesGuard } from '../auth/guard/roles.guard';
import { AuthGuard } from '../auth/guard/auth.guard';
import { httpResponse } from 'src/common/interface/https-commons.interface';
import { OrderDto } from './dto/order.dto';
import { Roles } from 'src/common/decorator/decorator';
import { ROLE } from 'src/common/enum/global.enum';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('order')
@UseGuards(AuthGuard, RolesGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }


  @Roles(ROLE.USER)
  @ApiOperation({ summary: 'Eliminar una orden por su ID' })
  @ApiResponse({
    status: 200,
    description: 'Orden Eliminada',
    schema: {
      example: {
        message: 'Orden Eliminada',
        orderId: '65f04e8c7a2a6a9bbf1f0c42',
        description: 'Caja con libros',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'No se ha encontrado la orden',
  })
  @ApiResponse({
    status: 400,
    description: 'No se ha actualizado el detalle de la orden',
  })
  @Delete(':id')
  async GetOrder(@Param() orderId: OrderDto) {
    const fn = async () => {
      return await this.orderService.deleteOrder(orderId.id)
    }
    return await httpResponse(fn)
  }


  @ApiOperation({ summary: 'Crear una nueva orden con detalles' })
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({
    status: 201,
    description: 'Orden creada exitosamente',
    type: CreateOrderResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'No se ha encontrado la orden',
  })
  @ApiResponse({
    status: 400,
    description: 'Ha ocurrido un error al eliminar la orden',
  })
  @Post()
  @Roles(ROLE.USER)
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    const fn = async () => {
      return this.orderService.create(createOrderDto)
    }
    return await httpResponse(fn)
  }


  @ApiOperation({ summary: 'Editar un detalle específico de una orden' })
  @ApiBody({ type: CreateOrderPerUserDto })
  @ApiResponse({
    status: 200,
    description: 'Detalle actualizado correctamente',
    type: CreateOrderPerUserDto,
  })
  @ApiResponse({
    status: 404,
    description: 'No se ha encontrado la orden',
  })
  @ApiResponse({
    status: 400,
    description: 'No se ha actualizado el detalle de la orden'
  })
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
