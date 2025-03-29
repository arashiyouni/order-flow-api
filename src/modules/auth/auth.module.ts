import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { RolesGuard } from './guard/roles.guard';
import { AuthGuard } from './guard/auth.guard';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthRepositoryService } from './repository/authrepository.service';

@Module({
  imports: [
    PrismaModule,
    ConfigModule,
    JwtModule.register({
      global: true,
      secret: process.env.MY_SECRET,
      signOptions: { expiresIn: '60s' },
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthGuard,
    RolesGuard,
    AuthService,
    AuthRepositoryService
  ],
  exports: [
    AuthGuard,
    RolesGuard,
    AuthService
  ],
})
export class AuthModule { }
