import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvConfig } from './config/env.config';
import { OrderModule } from './modules/order/order.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [EnvConfig]
    }),
    OrderModule,
    AuthModule,
    UserModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
