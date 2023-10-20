import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ProductRepository } from './product.repository'
import { CreateProductDTO } from './dto/CreateProduct.dto'
import { ProductEntity } from './entity/product.entity'
import { UpdateProductDTO } from './dto/UpdateProduct.dto'

@Controller('/products')
export class ProductController {
  constructor(private productRepository: ProductRepository) {}
  @Post()
  async createProduct(@Body() productData: CreateProductDTO) {
    const productEntity = new ProductEntity(
      productData.nome,
      productData.usuarioId,
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

  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() userDataToUpdate: UpdateProductDTO
  ) {
    const updatedProduct = await this.productRepository.update(
      id,
      userDataToUpdate
    )
    return {
      message: 'Producto atualizado!',
      product: updatedProduct
    }
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const deletedProduct = await this.productRepository.delete(id)
    return {
      message: 'Producto removido com sucesso!',
      product: deletedProduct
    }
  }
}
