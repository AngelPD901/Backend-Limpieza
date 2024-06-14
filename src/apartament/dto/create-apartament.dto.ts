import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { User } from 'src/auth/entities/user.entity';
export class CreateApartamentDto {
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    user:User;
}
