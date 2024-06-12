import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {JoiValidationSchema} from './config/joi.config'
import {EnvConfiguration} from './config/env.config'
import { TaskModule } from './task/task.module';
import { ApartamentModule } from './apartament/apartament.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.BD_HOST,
      port: +process.env.BD_PORT,
      database: process.env.BD_NAME,
      username: process.env.BD_USERNAME,
      password: process.env.BD_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    TaskModule,
    ApartamentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
