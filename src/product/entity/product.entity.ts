import { v4 as uuid } from 'uuid'
// import { ProductFeatureEntity } from './productFeature.entity'
// import { ProductImageEntity } from './productImage.entity'

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    name: 'usuario_id',
    length: 100,
    nullable: false
  })
  usuarioId: string

  @Column({
    length: 100,
    nullable: false
  })
  nome: string

  @Column({
    nullable: false
  })
  valor: number

  @Column({
    nullable: false
  })
  quantidade: number

  @Column({
    length: 255,
    nullable: false
  })
  descricao: string

  @Column({
    length: 100,
    nullable: false
  })
  categoria: string

  // @Column({
  //   nullable: false
  // })
  // caracteristicas: ProductFeatureEntity[]

  // @Column({
  //   nullable: false
  // })
  // imagens: ProductImageEntity[]

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string

  constructor(
    nome: string,
    usuarioId: string,
    valor: number,
    quantidade: number,
    descricao: string,
    categoria: string
    // caracteristicas: ProductFeatureEntity[],
    // imagens: ProductImageEntity[],
  ) {
    this.id = uuid()
    this.usuarioId = usuarioId
    this.nome = nome
    this.valor = valor
    this.quantidade = quantidade
    this.descricao = descricao
    // this.caracteristicas = caracteristicas
    // this.imagens = imagens
    this.categoria = categoria
  }
}
