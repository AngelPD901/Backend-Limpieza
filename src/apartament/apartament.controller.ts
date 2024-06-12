import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApartamentService } from './apartament.service';
import { CreateApartamentDto } from './dto/create-apartament.dto';
import { UpdateApartamentDto } from './dto/update-apartament.dto';

@Controller('apartament')
export class ApartamentController {
  constructor(private readonly apartamentService: ApartamentService) {}

  @Post()
  create(@Body() createApartamentDto: CreateApartamentDto) {
    return this.apartamentService.create(createApartamentDto);
  }

  @Get()
  findAll() {
    return this.apartamentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apartamentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApartamentDto: UpdateApartamentDto) {
    return this.apartamentService.update(+id, updateApartamentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apartamentService.remove(+id);
  }
}
