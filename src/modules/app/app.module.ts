import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MailerModule } from '@nestjs-modules/mailer';
import * as path from 'path';

import configuration from '../../config/configuration';
import { AuthModule } from '../../modules/auth/auth.module';
import { UsersModule } from '../../modules/users/users.module';
import { ProductsModule } from '../../modules/products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [configuration],
      cache: false,
    }),
    BullModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get('queue.redis.host'),
          port: configService.get('queue.redis.post'),
        },
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('mail.mailtrap.host'),
          port: configService.get('mail.mailtrap.port'),
          secure: false,
          auth:{
            user: configService.get('mail.mailtrap.username'),
            pass: configService.get('mail.mailtrap.password'),
          }
        },
        defaults: {
          from: '"no-reply" <noreply@05397c0c0d-7896cf@inbox.mailtrap.io>',
        },
        template: {
          dir: path.join(
            process.env.INIT_CWD,
            'src/modules/util/mail/templates',
          ),
          //dir: __dirname + '/modules/shared/mail/templates/',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        }
      }),
      inject: [ConfigService],
    }),
    EventEmitterModule.forRoot(),
    AuthModule,
    UsersModule,
    ProductsModule
  ],
})
export class AppModule {}
