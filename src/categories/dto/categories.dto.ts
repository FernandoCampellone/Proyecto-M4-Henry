import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CategoryDto {
  @ApiProperty({
    description: 'ID de la categoría',
    example: 'c021d99a-e902-4b0a-91d1-78f89e972008',
    type: String,
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Nombre de la categoría',
    example: 'monitor',
    type: String,
  })
  @IsString()
  name: string;
}