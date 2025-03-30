import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { InformationUserResponse, SearchUserResponse, UserResponse } from './dto/response/user-response.dto';
import { RepositoryService } from './repository/repository.service';

@Injectable()
export class UserService {
  constructor(private userRepository: RepositoryService) { }

  async create(createUserDto: CreateUserDto): Promise<UserResponse> {
    const { username, email, password } = createUserDto

    const user = await this.userRepository.findUser(email)

    if (user) throw new BadRequestException(`El usuario ya tiene un correo registrado`)

    const hasPass = await bcrypt.hash(password, 10)

    const createUser = await this.userRepository.createUser(createUserDto, hasPass)

    if (!createUser) throw new BadRequestException(`Ha ocurrido un error al crear su usuario`)

    return {
      username: username
    }
  }

  async findOne(email: string): Promise<SearchUserResponse> {
    const user = await this.userRepository.findUser(email)

    if (!user) throw new BadRequestException(`El correo ya esta registrado`)

    return user
  }

  async findUsername(username: string): Promise<InformationUserResponse> {
    const user = await this.userRepository.findUsername(username)

    if (!user) throw new BadRequestException(`El usuario ya esta registrado`)

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role
    }
  }

  async findAllCities() {
    const city = await this.userRepository.findCity()
    const state = await this.userRepository.findState()

    if (!city && !state) throw new NotFoundException('No se han encontrado departamentos y municipios')

    return {
      city: city,
      state: state
    }
  }
}
