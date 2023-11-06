import { Module } from '@nestjs/common'
import { ProductController } from './product.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductService } from './product.service'
import { ProductEntity } from './entities/product.entity'
import { CustomLoggerModule } from '../customLogger/logger.module'

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), CustomLoggerModule],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
