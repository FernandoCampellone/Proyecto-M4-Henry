import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, ParseUUIDPipe, UseInterceptors, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { User } from './entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { ExcludePasswordInterceptor } from 'src/interceptors/noPassword.interceptor';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SigninDto } from 'src/auth/dto/auth.dto';

@ApiTags('USERS')
@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService) {}

  @Get()
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ExcludePasswordInterceptor)
  getUsers(@Query('page') page: number = 1, @Query('limit') limit: number = 5) {
    return this.usersService.getUsers(page, limit);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ExcludePasswordInterceptor)
  getUserById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.getUserById(id);
  }

    //* Usa el servicio de Auth para crear a los usuarios
  @Post('signUp')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(ExcludePasswordInterceptor)
  async signUp(@Body() user: CreateUserDto) {
    return await this.authService.signUp(user);
  }

  @Post('signIn')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ExcludePasswordInterceptor)
  async signin(@Body() user: SigninDto) {
    return await this.authService.signIn(user);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ExcludePasswordInterceptor)
  updateUser(@Param('id', new ParseUUIDPipe()) id: string, @Body() user: UpdateUserDto) {
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ExcludePasswordInterceptor)
  deleteUser(@Param('id', new ParseUUIDPipe()) id: string): Promise<User> {
    return this.usersService.deleteUser(id);
  }

  @Patch('assign-admin/:id')
  @ApiBearerAuth()
  @Roles(Role.SuperAdmin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  assingAdmin(@Param('id', new ParseUUIDPipe()) id: string,){
    return this.usersService.assingAdmin(id)
  }
}
