import {forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { BullModule } from '@nestjs/bull';

import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { HashService } from '../util/services/hash.service';
import { UsersModule } from '../../modules/users/users.module';
import { UsersService } from '../../modules/users/services/users.service';
import { WelcomeGreetingQueue } from '../../modules/users/queues/welcome-greeting.queue'
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { UserCreatedListener } from '../users/listeners/user-created.listener';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('app.jwtkey'),
        signOptions: {
          expiresIn: '1h',
        },
      }),
      inject: [ConfigService],
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    BullModule.registerQueue(
      {
        name: 'welcome-greeting',
      },
    ),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    HashService,
    UsersService,
    JwtStrategy,
    GoogleStrategy,
    FacebookStrategy,
    WelcomeGreetingQueue,
    UserCreatedListener
  ],
  exports: [HashService, AuthService],
})
export class AuthModule {}
