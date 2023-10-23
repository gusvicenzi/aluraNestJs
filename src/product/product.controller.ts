import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CreateProductDTO } from './dto/CreateProduct.dto'
import { ProductEntity } from './entity/product.entity'
import { UpdateProductDTO } from './dto/UpdateProduct.dto'
import { ProductService } from './product.service'
import { ListProductoDTO } from './dto/ListProduct.dto'

@Controller('/products')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Post()
  async createProduct(@Body() productData: CreateProductDTO) {
    const productEntity = new ProductEntity(
      productData.nome,
      productData.usuarioId,
      productData.valor,
      productData.quantidade,
      productData.descricao,
      productData.categoria
      // productData.caracteristicas,
      // productData.imagens
    )
    const createdProduct =
      await this.productService.createProduct(productEntity)
    return {
      message: 'Produto criado!',
      product: new ListProductoDTO(createdProduct)
    }
  }

  @Get()
  async listProducts() {
    return this.productService.listProducts()
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() productDataToUpdate: UpdateProductDTO
  ) {
    const updatedProduct = await this.productService.updateProduct(
      id,
      productDataToUpdate
    )
    return {
      message: 'Produto atualizado!',
      product: updatedProduct
    }
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const deletedProduct = await this.productService.deleteProduct(id)
    return {
      message: 'Produto removido com sucesso!',
      product: deletedProduct
    }
  }
}
