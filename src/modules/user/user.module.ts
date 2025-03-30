import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RepositoryService } from './repository/repository.service';
import { CommonModule } from '../auth/common.module';

@Module({
  imports: [PrismaModule, CommonModule],
  controllers: [UserController],
  providers: [UserService, RepositoryService],
  exports: [UserService]
})
export class UserModule { }
