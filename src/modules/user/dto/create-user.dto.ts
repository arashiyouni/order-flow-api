import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @IsEmail()
    email: string;

    @MinLength(3)
    @IsString()
    username: string;

    @IsString()
    password: string;
}

export class UserDto {

    @IsEmail()
    email: string;

    @IsString()
    password: string;
}
