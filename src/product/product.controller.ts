import { Body, Controller, Get, Post } from '@nestjs/common'
import { ProductRepository } from './product.repository'
import { CreateProductDTO } from './dto/CreateProduct.dto'

@Controller('/products')
export class ProductController {
  constructor(private productRepository: ProductRepository) {}
  @Post()
  async createProduct(@Body() productData: CreateProductDTO) {
    this.productRepository.save(productData)
    return { status: 'Produto criado!', userData: productData }
  }

  @Get()
  async listProducts() {
    return this.productRepository.list()
  }
}
