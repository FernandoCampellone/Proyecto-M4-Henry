import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsArray, ArrayMinSize, IsNotEmpty } from 'class-validator';
import { Products } from 'src/products/entities/product.entity';

export class CreateOrderDto {

  @ApiProperty({
    description: 'ID del usuario correspondiente a la orden',
    example: 'f62bf32a-5b92-48dd-8d55-9aa346b51059',
    type: String,
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'Lista de productos que pueden entrar en la orden',
    type: [Products],
    example: [
      {
        id: 'e3c0d4a4-3f80-4a2f-8a53-0a6c58f4b3ab',
        name: 'Auriculares JBL Redmi 2 Black',
        description: 'Auriculares inalámbricos',
        price: 10000,
        stock: 12,
        imgUrl: 'https://images.fravega.com/f500/f4472ddbf09d133b6973b0351fd8e4ee.jpg',
        categoryId: 'c021d99a-e902-4b0a-91d1-78f89e972008',
      },
    ],
  })
  @IsArray()
  @ArrayMinSize(1)
  products: Products[];
}