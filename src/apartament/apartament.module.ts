import { Module } from '@nestjs/common';
import { ApartamentService } from './apartament.service';
import { ApartamentController } from './apartament.controller';
import { Apartament } from './entities/apartament.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Apartament, User]),
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
  controllers: [ApartamentController],
  providers: [ApartamentService, AuthService, JwtStrategy],
})
export class ApartamentModule {}
