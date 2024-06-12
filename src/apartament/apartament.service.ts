import { Injectable } from '@nestjs/common';
import { CreateApartamentDto } from './dto/create-apartament.dto';
import { UpdateApartamentDto } from './dto/update-apartament.dto';

@Injectable()
export class ApartamentService {
  create(createApartamentDto: CreateApartamentDto) {
    return 'This action adds a new apartament';
  }

  findAll() {
    return `This action returns all apartament`;
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
