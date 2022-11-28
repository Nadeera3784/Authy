import {forwardRef, Module } from '@nestjs/common';

import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { PrismaService } from '../util/services/prisma.service';
import { EmailFilter } from './filters/email.filter';
import { AuthModule } from '../auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    forwardRef(() => AuthModule)
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    EmailFilter,
  ],
  exports: [
    UsersService,
    PrismaService
  ],
})
export class UsersModule {}
