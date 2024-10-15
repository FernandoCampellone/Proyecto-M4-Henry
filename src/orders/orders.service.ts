import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { Orders } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async getOrder(id: string): Promise<Orders> {
    return this.ordersRepository.getOrder(id);
  }

  async addOrder(createOrder: CreateOrderDto) {
    return this.ordersRepository.addOrder(createOrder);
  }
}