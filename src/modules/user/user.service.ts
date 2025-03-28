import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { SearchUserResponse, UserResponse } from './dto/response/user-response.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto): Promise<UserResponse> {
    const { username, email, password } = createUserDto

    const user = await this.prisma.user.findUnique({
      where: {
        email: email
      },
    })

    if (user) throw new BadRequestException(`El usuario ya tiene un correo registrado`)

    const hasPass = await bcrypt.hash(password, 10)

    const createUser = await this.prisma.user.create({
      data: {
        email: email,
        username: username,
        password: hasPass
      }
    })

    if (!createUser) throw new BadRequestException(`Ha ocurrido un error al crear su usuario`)

    return {
      username: username
    }
  }

  async signIn(userData: UserDto) {
    const { email, password } = userData

    const user = await this.findEmail(email)
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }
    return {
      username: user.username
    }
  }

  async findEmail(email: string): Promise<SearchUserResponse> {
    return await this.prisma.user.findUnique({
      where: {
        email: email
      },
    })
  }
}
