import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import {JwtModule} from '@nestjs/jwt'
import {PassportModule} from '@nestjs/passport'
import { JwtStrategy } from './strategies/jwt.strategy';
import { Task } from 'src/task/entities/task.entity';
import { Apartament } from 'src/apartament/entities/apartament.entity';


@Module({
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([User,Task,Apartament]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [],
      inject: [],
      useFactory: () => {
        return {
          global: true,
          secret: process.env.JWT_KEY,
          signOptions: { expiresIn: '2h' },
        };
      },
    }),
  ],
  exports: [TypeOrmModule,JwtStrategy],
})
export class AuthModule {}
