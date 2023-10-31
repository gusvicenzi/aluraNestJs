import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseInterceptors
} from '@nestjs/common'
import { CreateProductDTO } from './dto/CreateProduct.dto'
import { UpdateProductDTO } from './dto/UpdateProduct.dto'
import { ProductService } from './product.service'
import { ListProductoDTO } from './dto/ListProduct.dto'
import { CacheInterceptor, CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { ProductEntity } from './entities/product.entity'

@Controller('/products')
export class ProductController {
  constructor(
    private productService: ProductService,
    @Inject(CACHE_MANAGER) private gerenciadorDeCache: Cache
  ) {}
  @Post()
  async createProduct(@Body() productData: CreateProductDTO) {
    const createdProduct = await this.productService.createProduct(productData)
    return {
      message: 'Produto criado!',
      product: new ListProductoDTO(createdProduct)
    }
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  async listProducts() {
    return this.productService.listProducts()
  }

  @Get('/:id')
  // @UseInterceptors(CacheInterceptor)
  async getProduct(@Param('id') id: string) {
    let produto = await this.gerenciadorDeCache.get<ProductEntity>(
      `product-${id}`
    )

    if (!produto) {
      console.log('Obtendo produto do banco de dados')
      produto = await this.productService.getProduct(id)

      await this.gerenciadorDeCache.set(`product-${id}`, produto)
    }

    return {
      message: 'Produto obtido com sucesso.',
      product: produto
    }
  }

  @Put('/:id')
  async updateProduct(
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
  async deleteProduct(@Param('id') id: string) {
    const deletedProduct = await this.productService.deleteProduct(id)
    return {
      message: 'Produto removido com sucesso!',
      product: deletedProduct
    }
  }
}
