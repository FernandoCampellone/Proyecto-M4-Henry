import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus, Query, UseGuards, ParseUUIDPipe, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('PRODUCTS')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getProducts(@Query('page') page: number = 1, @Query('limit') limit: number = 5) {
    return this.productsService.getProducts(page, limit);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getProductById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.productsService.getProductById(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  updateProduct(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateProduct: UpdateProductDto) {
    return this.productsService.updateProduct(id, updateProduct);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  removeProduct(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.productsService.removeProduct(id);
  }
}
