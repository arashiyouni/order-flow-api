import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { httpResponse } from 'src/common/interface/https-commons.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const fn = async () => {
      return this.userService.create(createUserDto)
    }
    return await httpResponse(fn);
  }

  @Post('login')
  async signIn(@Body() userDto: UserDto) {
    const fn = async () => {
      return this.userService.signIn(userDto)
    }
    return await httpResponse(fn);
  }

}
