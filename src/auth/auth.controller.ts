import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginAuthDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/decorators/get-user.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { string } from 'joi';
import { TokenDto } from './dto/token.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({status:201,description:'Se creo el user satisfactoriamente y retorna el token',type:TokenDto})
  @ApiResponse({status:409,description:'Existe eun conflicto tanto puede ser username y existe o apartamento no se encuentra disponible'})
  @ApiResponse({status:400,description:'Request mal enviada puede q falten campos en el body'})
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }
  
  @Post('login')
  @ApiResponse({status:201,description:'Se logueo satisfactoriamente y retorna el token del usuario',type:TokenDto})
  @ApiResponse({status:401,description:'No autorizado error en username o password'})
  @ApiResponse({status:400,description:'Request mal enviada puede q falten campos en el body'})
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll() {
    return this.authService.findAll();
  }

  @Get('user')
  @UseGuards(AuthGuard())
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
