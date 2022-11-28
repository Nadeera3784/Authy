import {Module } from '@nestjs/common';

import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';
import { PrismaService } from '../util/services/prisma.service';
import { CacheService } from '../util/services/Cache.service';

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    PrismaService,
    CacheService
  ],
  exports: [
    ProductsService,
    PrismaService
  ],
})
export class ProductsModule {}
