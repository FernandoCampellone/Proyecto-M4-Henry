import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middlewares/loggerMiddleware';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import {swaggerConfig} from './config/swagger'
import { ProductsRepository } from './products/products.repository';
import { UsersRepository } from './users/users.repository';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('documentation',app,document)
  app.use(LoggerMiddleware);
  app.useGlobalPipes(new ValidationPipe({whitelist: true}))

  const productsRepository = app.get(ProductsRepository);
  const usersRepository = app.get(UsersRepository)

  await app.listen(3005);

  await productsRepository.addProductSeeder();
  await usersRepository.uploadSuperAdmin();
}
bootstrap();
