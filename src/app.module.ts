import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvConfig } from './config/env.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [EnvConfig]
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
