import { IsMongoId, IsString } from "class-validator";

export class OrderDto {

    @IsMongoId()
    orderId: string
}

export class OrderResponse {

    @IsString()
    message: string

    @IsMongoId()
    orderId: string

    @IsString()
    description: string
}