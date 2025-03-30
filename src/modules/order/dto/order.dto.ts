import { IsMongoId, IsString } from "class-validator";

export class OrderDto {

    @IsMongoId()
    id: string
}

export class OrderResponse {

    @IsString()
    message: string

    @IsMongoId()
    orderId: string

    @IsString()
    description: string
}