import { ProductEntity } from '../entities/product.entity'

class ListFeatureProductDTO {
  nome: string
  descricao: string
}

class ListImageProductoDTO {
  url: string
  descricao: string
}

export class ListProductoDTO {
  readonly id: string
  readonly usuarioId: string
  readonly nome: string
  readonly valor: number
  readonly quantidadeDisponivel: number
  readonly descricao: string
  readonly categoria: string
  readonly caracteristicas: ListFeatureProductDTO[]
  readonly imagens: ListImageProductoDTO[]

  constructor(productEntity: ProductEntity) {
    this.id = productEntity.id
    this.nome = productEntity.nome
    this.valor = productEntity.valor
    this.quantidadeDisponivel = productEntity.quantidadeDisponivel
    this.descricao = productEntity.descricao
    this.categoria = productEntity.categoria
  }
}
