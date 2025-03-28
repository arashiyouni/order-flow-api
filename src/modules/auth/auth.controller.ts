import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/create-auth.dto';
import { httpResponse } from 'src/common/interface/https-commons.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async create(@Body() userDTO: UserDto) {
    const fn = async () => {
      return this.authService.signIn(userDTO)
    }
    return await httpResponse(fn);
  }
}
