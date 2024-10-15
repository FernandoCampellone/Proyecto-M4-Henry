import { Controller, Get, Post, Param, Body, HttpCode, HttpStatus, ParseUUIDPipe, UseGuards, UseInterceptors } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Orders } from './entities/order.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ExcludePasswordInterceptor } from 'src/interceptors/noPassword.interceptor';

@ApiTags('ORDERS')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ExcludePasswordInterceptor)
  async getOrder(@Param('id', new ParseUUIDPipe()) id: string): Promise<Orders> {
    return this.ordersService.getOrder(id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(ExcludePasswordInterceptor)
  @HttpCode(HttpStatus.CREATED)
  async addOrder(@Body() createOrder: CreateOrderDto) {
    return this.ordersService.addOrder(createOrder);
  }
}