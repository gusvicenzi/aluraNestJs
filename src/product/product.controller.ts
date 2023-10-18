import { Body, Controller, Get, Post } from '@nestjs/common'
import { ProductRepository } from './product.repository'
import { CreateProductDTO } from './dto/CreateProduct.dto'
import { ProductEntity } from './product.entity'

@Controller('/products')
export class ProductController {
  constructor(private productRepository: ProductRepository) {}
  @Post()
  async createProduct(@Body() productData: CreateProductDTO) {
    const productEntity = new ProductEntity(
      productData.nome,
      productData.valor,
      productData.quantidade,
      productData.descricao,
      productData.caracteristicas,
      productData.imagens,
      productData.categoria
    )
    this.productRepository.save(productEntity)
    return { message: 'Produto criado!', product: productEntity }
  }

  @Get()
  async listProducts() {
    return this.productRepository.list()
  }
}
