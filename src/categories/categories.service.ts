import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from './entities/categories.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
  @InjectRepository(Categories)
  private readonly categoriesRepository: Repository<Categories>){}

  getCategories() {
    return this.categoriesRepository.find();
  }

  async findOrCreate(name: string): Promise<Categories> {
    let category = await this.categoriesRepository.findOne({ where: { name } });
    if (!category) {
      category = this.categoriesRepository.create({ name });
      await this.categoriesRepository.save(category);
    }
    return category;
  }
}
