import { Controller, Post, Body, BadRequestException, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { httpResponse } from 'src/common/interface/https-commons.interface';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponse } from './dto/response/user-response.dto';
import { LocationResponse } from './dto/response/location-response.dto';
import { Roles } from 'src/common/decorator/decorator';
import { ROLE } from 'src/common/enum/global.enum';
import { RolesGuard } from '../auth/guard/roles.guard';
import { AuthGuard } from '../auth/guard/auth.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado correctamente',
    type: UserResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'El usuario ya tiene un correo registrado',
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const fn = async () => {
      return this.userService.create(createUserDto)
    }
    return await httpResponse(fn);
  }

  @ApiOperation({ summary: 'Devuelve los departamentos y municipios' })
  @ApiResponse({
    status: 200,
    description: 'Lista de departamentos y municipios',
    type: LocationResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'No se encontraron departamentos ni municipios',
  })

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ROLE.USER)
  @Get()
  async getCities() {
    const fn = async () => {
      return this.userService.findAllCities()
    }
    return await httpResponse(fn);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ROLE.ADMIN)
  @Get('all-user')
  async getAllOrder() {
    const fn = async () => {
      return await this.userService.findAllOrder()
    }
    return await httpResponse(fn);
  }
}
