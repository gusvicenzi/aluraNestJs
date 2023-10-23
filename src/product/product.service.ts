import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProductEntity } from './entity/product.entity'
import { ListProductoDTO } from './dto/ListProduct.dto'
import { UpdateProductDTO } from './dto/UpdateProduct.dto'

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>
  ) {}

  async createProduct(productEntity: ProductEntity) {
    const createdProduct = await this.productRepository.save(productEntity)
    return createdProduct
  }

  async listProducts() {
    const savedProducts = await this.productRepository.find()

    const productsList = savedProducts.map(
      (product) => new ListProductoDTO(product)
    )

    return productsList
  }

  async updateProduct(id: string, productEntity: UpdateProductDTO) {
    return await this.productRepository.update(id, productEntity)
  }

  async deleteProduct(id: string) {
    return await this.productRepository.delete(id)
  }
}