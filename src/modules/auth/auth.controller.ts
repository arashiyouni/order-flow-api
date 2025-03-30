import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResponseDto, UserDto } from './dto/create-auth.dto';
import { httpResponse } from 'src/common/interface/https-commons.interface';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOperation({ summary: 'Iniciar sesión con correo y contraseña' })
  @ApiBody({ type: UserDto })
  @ApiResponse({
    status: 200,
    description: 'Login exitoso',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'No se ha encontrado usuario'
  })
  @Post('login')
  async create(@Body() userDTO: UserDto) {
    const fn = async () => {
      return this.authService.signIn(userDTO)
    }
    return await httpResponse(fn);
  }
}
