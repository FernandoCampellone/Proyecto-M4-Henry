import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsInt, Length, Matches, IsUUID } from 'class-validator';

export class UpdateUserDto {

  @ApiProperty({
    description: 'Es opcional. Nombre del usuario a modificar',
    example: 'Tomás',
    type: String,
  })
  @IsOptional()
  @IsString()
  @Length(3, 50)
  name?: string;

  @ApiProperty({
    description: 'Es opcional. Email del usuario a modificar',
    example: 'Tomás@gmail.com',
    type: String,
  })
  @IsOptional()
  @IsEmail()
  @Length(3, 50)
  email?: string;

  @ApiProperty({
    description: 'Es opcional. Contraseña del usuario a modificar',
    example: 'Tomás1234*',
    type: String,
  })
  @IsOptional()
  @IsString()
  @Length(8, 15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.',
  })
  password?: string;

  @ApiProperty({
    description: 'Es opcional. Número de teléfono del usuario a modificar',
    example: 3513122,
    type: Number,
  })
  @IsOptional()
  @IsInt()
  phone?: number;

  @ApiProperty({
    description: 'Es opcional. País del usuario a modificar',
    example: 'México',
    type: String,
  })
  @IsOptional()
  @IsString()
  @Length(4, 50)
  country?: string;

  @ApiProperty({
    description: 'Es opcional. Dirección del usuario a modificar',
    example: 'TomásStreet 12345',
    type: String,
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    description: 'Es opcional. Ciudad del usuario a modificar',
    example: 'Acapulco',
    type: String,
  })
  @IsOptional()
  @IsString()
  @Length(4, 50)
  city?: string;
}
