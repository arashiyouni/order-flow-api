import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { ROLE } from 'src/common/enum/global.enum';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private authService: AuthService,
    private configService: ConfigService,
  ) { }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<ROLE[]>('roles', context.getHandler());

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = this.authService.extractTokenFromHeader(request);

    if (!token) {
      throw new ForbiddenException('No se proporcionó token');
    }
    const payload = this.jwtService.verify(token, {
      secret: this.configService.get<string>('jwt'),
    });

    request.user = payload;

    const hasRole = payload.roles?.some((role: string) =>
      requiredRoles.includes(role as ROLE),
    );

    if (!hasRole) {
      throw new ForbiddenException('No tiene permisos para acceder a este recurso');
    }

    return true;
  }
}

