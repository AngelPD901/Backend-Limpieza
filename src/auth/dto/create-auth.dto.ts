import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Apartament } from 'src/apartament/entities/apartament.entity';

export class CreateAuthDto {
  
  @ApiProperty()  
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
  
  @ApiProperty()
  @IsOptional()
  isLogged?: boolean;
  
  @ApiProperty()
  @IsString()
  apartament?:string;
}
