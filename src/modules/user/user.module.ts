import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RepositoryService } from './repository/repository.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, RepositoryService],
  exports: [UserService]
})
export class UserModule { }
