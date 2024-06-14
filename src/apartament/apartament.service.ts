import { ConflictException, Injectable } from '@nestjs/common';
import { CreateApartamentDto } from './dto/create-apartament.dto';
import { UpdateApartamentDto } from './dto/update-apartament.dto';
import { Apartament } from './entities/apartament.entity';
import {InjectRepository} from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class ApartamentService {
  constructor(@InjectRepository(Apartament) private readonly apartmentRepository: Repository<Apartament>,
  @InjectRepository(User) private readonly authRepository: Repository<User>,
  private readonly authService:AuthService
){}
  async create(createApartamentDto: CreateApartamentDto) {
    const {name,user} = createApartamentDto;
    const apart = await this.apartmentRepository.findOneBy({name:name});
    if(apart)
      throw new ConflictException('This name for apartment is in use');

    const newApartment = await this.apartmentRepository.create({
      name:name,
      user:[await this.authService.createAux(user)],
    })
    await this.apartmentRepository.save(newApartment);

    return newApartment;
  }

  findAll() {
    return this.apartmentRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} apartament`;
  }

  update(id: number, updateApartamentDto: UpdateApartamentDto) {
    return `This action updates a #${id} apartament`;
  }

  remove(id: number) {
    return `This action removes a #${id} apartament`;
  }
}
