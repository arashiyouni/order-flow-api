import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { httpResponse } from 'src/common/interface/https-commons.interface';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ROLE } from 'src/common/enum/global.enum';
import { Roles } from 'src/common/decorator/decorator';
import { RolesGuard } from '../auth/guard/roles.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ROLE.ADMIN)
  @Get(':username')
  async getUser(@Param('username') username: string) {
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
