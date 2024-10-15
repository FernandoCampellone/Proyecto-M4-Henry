import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Products } from "./entities/product.entity";
import { Repository } from "typeorm";
import products from "src/helpers/archivo";
import { CategoriesService } from '../categories/categories.service';
import { Categories } from "src/categories/entities/categories.entity";

@Injectable()
export class ProductsRepository{
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
    private readonly categoriesService: CategoriesService,
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>
  ) {}

  async getProducts(page: number, limit: number): Promise<Products[]> {
    const [products] = await this.productsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return products;
  }

  async getProductById(id : string){
    return await this.productsRepository.findOneBy({id})
  }


  async addProductSeeder() : Promise<Products> {
    const productEntities = [];
    for (const product of products) {

      const existingProduct = await this.productsRepository.findOne({ where: { name: product.name } });
      if (!existingProduct) {
        const category = await this.categoriesService.findOrCreate(product.category);
        productEntities.push({
          ...product,
          category,
        });
      }
    }
    if (productEntities.length > 0) {
      await this.productsRepository.save(productEntities);
    }
    return;
    }

  async updateProducts( id:string, updateProduct){
    
    const {name} = updateProduct
    const product = await this.productsRepository.findOneBy({id})
  
    if(!product){
      throw new NotFoundException('Product not Found')
    }

    if(updateProduct.name){
      const existingProduct = await this.productsRepository.findOne({where: {name}});
      if(existingProduct && existingProduct.name === name){
        throw new ConflictException('Product already exists')
      }
    }
    await this.productsRepository.update(product,updateProduct)
    return updateProduct
  }

  async deleteProduct(id:string): Promise<Products>{
    const deletedProduct = await this.productsRepository.findOneBy({id});
    if(!deletedProduct){
      throw new NotFoundException('Product not found, cant delete');
    }
    await this.productsRepository.delete(deletedProduct)
    return deletedProduct
  }
}
