import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CreateProductDTO } from './dto/CreateProduct.dto'
import { UpdateProductDTO } from './dto/UpdateProduct.dto'
import { ProductService } from './product.service'
import { ListProductoDTO } from './dto/ListProduct.dto'

@Controller('/products')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Post()
  async createProduct(@Body() productData: CreateProductDTO) {
    const createdProduct = await this.productService.createProduct(productData)
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
