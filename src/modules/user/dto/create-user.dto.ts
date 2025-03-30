import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        description: 'Correo electrónico del nuevo usuario',
        example: 'angie@example.com',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Nombre de usuario',
        example: 'angie',
        minLength: 3,
    })
    @MinLength(3)
    @IsString()
    username: string;

    @ApiProperty({
        description: 'Contraseña del usuario',
        example: '12345678',
    })
    @IsString()
    password: string;
}