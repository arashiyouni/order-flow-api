import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { httpResponse } from 'src/common/interface/https-commons.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get(':username')
  async getUser( @Param('username') username: string) {
    const fn = async () => {
      return this.userService.findUsername(username)
    }
    return await httpResponse(fn);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const fn = async () => {
      return this.userService.create(createUserDto)
    }
    return await httpResponse(fn);
  }

}
