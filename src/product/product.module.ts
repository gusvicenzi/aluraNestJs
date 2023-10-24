import { Module } from '@nestjs/common'
import { ProductController } from './product.controller'
import { ProductRepository } from './product.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductService } from './product.service'
import { ProductEntity } from './entities/product.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
  providers: [ProductRepository, ProductService]
})
export class ProductModule {}
