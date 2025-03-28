import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { UserDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) { }

  async signIn(userData: UserDto) {
    const { email, password } = userData

    const user = await this.usersService.findOne(email)
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new UnauthorizedException()

    const payload = { email: user.email, sub: user.id, username: user.username }

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  extractTokenFromHeader(request: Request){
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
