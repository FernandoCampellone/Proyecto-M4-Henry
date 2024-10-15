import { Controller, Post, Body, HttpCode, HttpStatus, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ExcludePasswordInterceptor } from 'src/interceptors/noPassword.interceptor';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('AUTHENTICATION')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

}