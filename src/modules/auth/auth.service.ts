import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { UserDto } from './dto/create-auth.dto';
import { AuthRepositoryService } from './repository/authrepository.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private authRepository: AuthRepositoryService
  ) { }

  async signIn(userData: UserDto) {
    const { email, password } = userData

    const user = await this.authRepository.findEmail(email)

    if (!user) throw new NotFoundException('No se ha encontrado usuario')

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new UnauthorizedException()

    const payload = { email: user.email, sub: user.id, username: user.username, roles: [user.role] }

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
