import { Module } from '@nestjs/common';
import { ApartamentService } from './apartament.service';
import { ApartamentController } from './apartament.controller';

@Module({
  controllers: [ApartamentController],
  providers: [ApartamentService],
})
export class ApartamentModule {}
