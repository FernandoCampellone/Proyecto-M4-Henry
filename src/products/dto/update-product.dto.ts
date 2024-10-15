import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsUUID, IsDecimal } from 'class-validator';

export class UpdateProductDto {

  @ApiProperty({
    description: 'Es opcional. Nombre del producto a modificar',
    example: 'RedDragon Keyboard',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Es opcional. Descripción del producto a modificar',
    example: 'Best Keyboard All Around',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Es opcional. Precio del producto a modificar',
    example: 100.90,
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({
    description: 'Es opcional. Stock del producto a modificar',
    example: 12,
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  stock?: number;

  @ApiProperty({
    description: 'Es opcional. URL de imagen del producto a modificar',
    example: 'https://images.fravega.com/f500/f4472ddbf09d133b6973b0351fd8e4ee.jpg',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  imgUrl?: string;

  @ApiProperty({
    description: 'Es opcional. ID de la categoría del producto a modificar',
    example: 'c021d99a-e902-4b0a-91d1-78f89e972008',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsUUID()
  category?: string;
}