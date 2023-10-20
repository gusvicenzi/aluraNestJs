import { Injectable } from '@nestjs/common'
import { ProductEntity } from './entity/product.entity'

@Injectable()
export class ProductRepository {
  private products = []

  private async getProductById(id: string) {
    const possibleProduct = this.products.find((product) => product.id === id)

    if (!possibleProduct) throw new Error('Produto não encontrado!')
    return possibleProduct
  }

  async save(product: ProductEntity) {
    this.products.push(product)
    console.log(this.products)
  }

  async update(id: string, newData: Partial<ProductEntity>) {
    const product = await this.getProductById(id)

    const notUpdatableData = ['id', 'usuarioId']

    Object.entries(newData).forEach(([key, value]) => {
      if (notUpdatableData.includes(key)) {
        return
      }

      product[key] = value
    })

    return product
  }

  async list() {
    return this.products
  }

  async delete(id: string) {
    const product = await this.getProductById(id)
    this.products = this.products.filter(
      (savedProduct) => savedProduct.id !== id
    )
    return product
  }
}
