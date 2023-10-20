import { Column, Entity } from 'typeorm'

@Entity({ name: 'product_features' })
export class ProductFeatureEntity {
  @Column({
    length: 100,
    nullable: false
  })
  nome: string
  @Column({
    length: 255,
    nullable: false
  })
  descricao: string

  constructor(nome: string, descricao: string) {
    this.nome = nome
    this.descricao = descricao
  }
}
