import { IsDate, IsMongoId, IsNumber, IsPhoneNumber, IsString } from "class-validator";

export class CreateOrderDto {

    @IsDate()
    scheduleDeliveryDate: Date

    @IsString()
    name: string

    @IsString()
    lastname: string

    @IsString()
    email: string

    @IsPhoneNumber()
    phone: string

    @IsString()
    deliveryAddress: string

    @IsString()
    state: string

    @IsString()
    city: string

    @IsString()
    instructions: string

    OrderPerUser: CreateOrderPerUserDto[]
}

export class CreateOrderPerUserDto {

    @IsNumber()
    weight: number;

    @IsNumber()
    length: number;

    @IsNumber()
    height: number;

    @IsNumber()
    width: number;

    @IsString()
    description: string;
}

export class CreateOrderResponse {

    @IsDate()
    scheduleDeliveryDate: Date

    @IsString()
    name: string

    @IsMongoId()
    orderId: string[]
}