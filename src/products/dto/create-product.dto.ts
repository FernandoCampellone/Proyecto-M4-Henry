import { IsString, IsNotEmpty, IsNumber, IsOptional, IsUUID, IsDecimal } from 'class-validator';

export class CreateProductDto {

  @IsOptional()
  @IsUUID()
  id: string; 

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsDecimal()
  @IsNotEmpty()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  readonly stock: number;

  @IsString()
  @IsOptional()
  readonly imgUrl?: string;

  @IsString()
  @IsNotEmpty()
  category: string;
}