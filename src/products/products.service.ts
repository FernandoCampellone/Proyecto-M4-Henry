import { Injectable } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';
import { Products } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository){}

  async getProducts(page: number, limit: number) {
    return this.productsRepository.getProducts(page, limit);
  }

  async getProductById(id: string) {
    return this.productsRepository.getProductById(id);
  }

  async updateProduct(id: string, updateProduct: UpdateProductDto) {
    return this.productsRepository.updateProducts(id, updateProduct);
  }

  async removeProduct(id: string) {
    return this.productsRepository.deleteProduct(id);
  }
}
