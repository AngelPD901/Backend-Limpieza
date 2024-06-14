import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Apartament } from 'src/apartament/entities/apartament.entity';

export class CreateAuthDto {
    
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
  
  @IsOptional()
  isLogged?: boolean;

  @IsString()
  apartament?:string;
}
