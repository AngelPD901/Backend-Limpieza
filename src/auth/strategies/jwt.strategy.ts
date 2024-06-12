import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../../interfaces/jwtpayload';
import { User } from 'src/auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(User) private readonly authRepository: Repository<User>) {
    super({
      secretOrKey: process.env.JWT_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const {id} = payload;
    const user = await this.authRepository.findOneBy({id:id});

    if(!user)
        throw new UnauthorizedException('Token not valid');

    if(!user.isActive)
        throw new UnauthorizedException('User is inactivate,talk with admin');

    return user;
  }
}