import {
  Injectable,
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { LoginAuthDto, CreateAuthDto, UpdateAuthDto } from './dto';
import { JwtPayload } from '../interfaces/jwtpayload';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Apartament } from 'src/apartament/entities/apartament.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly authRepository: Repository<User>,
    @InjectRepository(Apartament) private readonly apartamentRepository:Repository<Apartament>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    const { password,apartament, ...userData } = createAuthDto;
    const apart = await this.apartamentRepository.findOneBy({name:apartament})
    if(!apart) throw new ConflictException('This apartament not exist');

    const user = await this.authRepository.findOneBy({
      username: createAuthDto.username,
    });

    if (user) throw new ConflictException('This username is in use');

    const passwordHash = bcrypt.hashSync(password, 10);
    const userCreate = await this.authRepository.create({
      ...userData,
      password: passwordHash,
      aparment:apart
    });
    await this.authRepository.save(userCreate);

      return {
        token: this.getJwt({
          id: userCreate.id,
          username: userCreate.username,
        }),
      };
      

    
    /*} catch (error) {
      this.handlerBDError(error);
    }*/
  }
  async createAux(createAuthDto: CreateAuthDto) {
    const { password, ...userData } = createAuthDto;

    const user = await this.authRepository.findOneBy({
      username: createAuthDto.username,
    });

    if (user) throw new ConflictException('This username is in use');

    const passwordHash = bcrypt.hashSync(password, 10);
    const userCreate = await this.authRepository.create({
      ...userData,
      password: passwordHash,
    });
    await this.authRepository.save(userCreate);

    return userCreate;
    /*} catch (error) {
      this.handlerBDError(error);
    }*/
  }
  async login(loginAuthDto: LoginAuthDto) {
    const { username, password } = loginAuthDto;
    const user = await this.authRepository.findOneBy({ username: username });

    if (!user)
      throw new UnauthorizedException('Credenciales no validas (username)');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credencailes no validas (password)');

    return {
      token: this.getJwt({
        id: user.id,
        username: user.username,
      }),
    };
  }

  async findAll() {
    const users = await this.authRepository.find();
    return { userlist: users };
  }

  findOne(id: string) {
    return this.authRepository.findOneBy({ id: id });
  }

  update(id: string, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  private handlerBDError(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.datail);

    throw new InternalServerErrorException('Please check server logs');
  }
  private getJwt(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
