import { IsEmail, IsMongoId, IsString } from "class-validator"

export class InformationUserResponse {
    @IsMongoId()
    id: string

    @IsEmail()
    email: string

    @IsString()
    username: string

    @IsString()
    role: string
}
export class SearchUserResponse extends InformationUserResponse {
    @IsString()
    password: string
}

export class UserResponse {
    @IsString()
    username: string
}