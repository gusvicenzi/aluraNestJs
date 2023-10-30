import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProductEntity } from './entities/product.entity'
import { ListProductoDTO } from './dto/ListProduct.dto'
import { UpdateProductDTO } from './dto/UpdateProduct.dto'
import { CreateProductDTO } from './dto/CreateProduct.dto'

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>
  ) {}

  async createProduct(productData: CreateProductDTO) {
    const productEntity = new ProductEntity(
      productData.nome,
      productData.valor,
      productData.quantidadeDisponivel,
      productData.descricao,
      productData.categoria,
      productData.caracteristicas,
      productData.imagens
    )
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

  async updateProduct(id: string, newData: UpdateProductDTO) {
    const entityName = await this.productRepository.findOneBy({ id })

    if (entityName === null)
      throw new NotFoundException('Produto não encontrado')

    Object.assign(entityName, newData)

    return this.productRepository.save(entityName)
  }

  async deleteProduct(id: string) {
    const result = await this.productRepository.delete(id)
    if (!result.affected) throw new NotFoundException('Produto não encontrado.')
  }
}
