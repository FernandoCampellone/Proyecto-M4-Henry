import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';


@Injectable()
export class FileUploadService {
  constructor(private readonly fileUploadRepository: FileUploadRepository,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>){}

  async uploadImage(file: Express.Multer.File, productId: string) {
    const foundProduct = await this.productsRepository.findOneBy({id:productId})
    
    if (!foundProduct){
      throw new NotFoundException('Product not found')
    }
    
    const uploadedImage = await this.fileUploadRepository.uploadImage(file);
    
    const updatedProduct = await this.productsRepository.update(foundProduct.id,{imgUrl: uploadedImage.secure_url} )
    return {message: `Image was successfuly uploaded! The new link is: ${uploadedImage.secure_url}`};
  }

}
