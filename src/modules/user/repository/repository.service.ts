import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class RepositoryService {
    constructor(private prisma: PrismaService) { }

    async findUser(email: string) {
        return await this.prisma.user.findUnique({
            where: {
                email: email
            },
        })
    }

    async findUsername(username: string) {
        return await this.prisma.user.findUnique({
            where: {
                username: username
            },
        })
    }

    async findAllOrder() {
        return this.prisma.order.findMany({
            select: {
                name: true,
                lastname: true,
                state: true,
                phone: true,
                OrderPerUser: {
                    select: {
                        description: true,
                    },
                },
            },
        });

    }

    async findState() {
        return await this.prisma.state.findMany()
    }

    async findCity() {
        return await this.prisma.city.findMany()
    }

    async createUser(user: CreateUserDto, pass: string) {
        return await this.prisma.user.create({
            data: {
                email: user.email,
                username: user.username,
                password: pass
            }
        })
    }
}
