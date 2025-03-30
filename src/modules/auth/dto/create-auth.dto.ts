import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class UserDto {
    @ApiProperty({
        description: 'Correo electrónico del usuario',
        example: 'admin@boxful.com',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Contraseña del usuario',
        example: 'admin',
    })
    @IsString()
    password: string;
}

export class LoginResponseDto {
    @ApiProperty({
        description: 'Token JWT generado al iniciar sesión',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    })
    access_token: string;
}