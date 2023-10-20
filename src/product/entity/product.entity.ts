import { v4 as uuid } from 'uuid'
import { ProductFeatureEntity } from './productFeature.entity'
import { ProductImageEntity } from './productImage.entity'

export class ProductEntity {
  id: string
  usuarioId: string
  nome: string
  valor: number
  quantidade: number
  descricao: string
  caracteristicas: ProductFeatureEntity[]
  imagens: ProductImageEntity[]
  categoria: string

  constructor(
    nome: string,
    usuarioId: string,
    valor: number,
    quantidade: number,
    descricao: string,
    caracteristicas: ProductFeatureEntity[],
    imagens: ProductImageEntity[],
    categoria: string
  ) {
    this.id = uuid()
    this.usuarioId = usuarioId
    this.nome = nome
    this.valor = valor
    this.quantidade = quantidade
    this.descricao = descricao
    this.caracteristicas = caracteristicas
    this.imagens = imagens
    this.categoria = categoria
  }
}
