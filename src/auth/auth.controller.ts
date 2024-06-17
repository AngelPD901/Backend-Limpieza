import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginAuthDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/decorators/get-user.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TokenDto } from '../doc/';
import { ListUserDto } from 'src/doc/listUser.dto';
import { User } from './entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'Se creo el user satisfactoriamente y retorna el token',
    type: TokenDto,
  })
  @ApiResponse({
    status: 409,
    description:
      'Existe eun conflicto tanto puede ser username y existe o apartamento no se encuentra disponible',
  })
  @ApiResponse({
    status: 400,
    description: 'Request mal enviada puede q falten campos en el body',
  })
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  @ApiResponse({
    status: 201,
    description: 'Se logueo satisfactoriamente y retorna el token del usuario',
    type: TokenDto,
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado error en username o password',
  })
  @ApiResponse({
    status: 400,
    description: 'Request mal enviada puede q falten campos en el body',
  })
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  @ApiResponse({status:200,description:'Retorna una lista de todos los usuarios del sitema ',type:ListUserDto})
  @ApiResponse({status:401,description:'No autorizacion para esta ruta (falta el token o no es valido)'})
  findAll() {
    return this.authService.findAll();
  }

  @Get('user')
  @UseGuards(AuthGuard())
  @ApiResponse({status:200,description:'Retorna la informacion del usuario logueado',type:User})
  @ApiResponse({status:401,description:'No autorizacion para esta ruta (falta el token o no es valido)'})
  findOne(@GetUser('id') id: string) {
    return this.authService.findOne(id);
  }

  @Patch('user')
  update(@GetUser('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
