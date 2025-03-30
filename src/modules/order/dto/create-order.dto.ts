import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsMongoId, IsNumber, IsPhoneNumber, IsString } from "class-validator";

export class CreateOrderDto {

    @ApiProperty({ example: '2025-04-01T14:00:00.000Z' })
    @IsDate()
    scheduleDeliveryDate: Date;

    @ApiProperty({ example: 'Juan' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'Pérez' })
    @IsString()
    lastname: string;

    @ApiProperty({ example: 'juan@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: '+521234567890' })
    @IsPhoneNumber()
    phone: string;

    @ApiProperty({ example: 'Calle Falsa 123' })
    @IsString()
    deliveryAddress: string;

    @ApiProperty({ example: 'CDMX' })
    @IsString()
    state: string;

    @ApiProperty({ example: 'Ciudad de México' })
    @IsString()
    city: string;

    @ApiProperty({ example: 'Tocar el timbre dos veces' })
    @IsString()
    instructions: string;

    @ApiProperty({
        description: 'Lista de paquetes de la orden',
    })
    OrderPerUser: CreateOrderPerUserDto[]
}

export class CreateOrderPerUserDto {

    @ApiProperty({ example: 5 })
    @IsNumber()
    weight: number;

    @ApiProperty({ example: 30 })
    @IsNumber()
    length: number;

    @ApiProperty({ example: 20 })
    @IsNumber()
    height: number;

    @ApiProperty({ example: 15 })
    @IsNumber()
    width: number;

    @ApiProperty({ example: 'Caja con libros' })
    @IsString()
    description: string;
}

export class CreateOrderResponse {
    @ApiProperty({ example: '2025-04-01T14:00:00.000Z' })
    @IsDate()
    scheduleDeliveryDate: Date;

    @ApiProperty({ example: 'Juan Pérez' })
    @IsString()
    name: string;

    @ApiProperty({
        type: [String],
        description: 'IDs de los paquetes creados',
        example: ['65f04e8c7a2a6a9bbf1f0c42'],
    })
    @IsMongoId({ each: true })
    orderId: string[];
}