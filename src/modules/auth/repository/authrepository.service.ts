import { Injectable } from '@nestjs/common';
import { SearchUserResponse, UserResponse } from 'src/modules/user/dto/response/user-response.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthRepositoryService {
    constructor(private prisma: PrismaService) { }

    async findEmail(email: string): Promise<SearchUserResponse> {
        return await this.prisma.user.findUnique({
            where: {
                email: email
            },
        })
    }

    async findUsername(username: string): Promise<UserResponse> {
        return await this.prisma.user.findUnique({
            where: {
                username: username
            },
        })
    }

}
