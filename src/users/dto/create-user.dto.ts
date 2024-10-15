import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsInt, Length, IsNotEmpty, Matches, IsUUID, Validate, IsEmpty } from 'class-validator';
import { MatchPassword } from 'src/decorators/matchPassword.decorator';
import { Role } from 'src/role.enum';

export class CreateUserDto {

  @ApiProperty({
    description: 'Nombre del usuario a crear',
    example: 'Fernando',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  name: string;

  @ApiProperty({
    description: 'Dirección de mail del usuario a crear',
    example: 'Fernando@gmail.com',
    type: String,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario a crear',
    example: 'Password123*',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @Length(8, 15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.',
  })
  password: string;

  @ApiProperty({
    description: 'Validación de contraseña del usuario a crear',
    example: 'Password123*',
    type: String,
  })
  @IsNotEmpty()
  @Validate(MatchPassword, ['password'])
  confirmPassword: string;

  @ApiProperty({
    description: 'Número de teléfono del usuario a crear',
    example: 3513123,
    type: Number,
  })
  @IsNotEmpty()
  @IsInt()
  phone: number;

  @ApiProperty({
    description: 'País del usuario a crear',
    example: 'Argentina',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @Length(4, 20)
  country: string;

  @ApiProperty({
    description: 'Dirección de vivienda del usuario a crear',
    example: 'Calle Fernando 1221',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    description: 'Ciudad del usuario a crear',
    example: 'Córdoba',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @Length(4, 20)
  city: string;

  @ApiProperty({
    description: 'Rol del usuario a crear',
    example: 'user',
    type: String,
    required: false,
  })
  @IsOptional()
  role?: Role;
}