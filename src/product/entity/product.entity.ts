import { v4 as uuid } from 'uuid'
import { ProductFeatureEntity } from './productFeature.entity'
import { ProductImageEntity } from './productImage.entity'

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
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
    name: 'quantidade_disponivel',
    nullable: false
  })
  quantidadeDisponivel: number

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
  @OneToMany(
    () => ProductFeatureEntity,
    (productFeatureEntity) => productFeatureEntity.product,
    { cascade: true, eager: true }
  )
  caracteristicas: ProductFeatureEntity[]

  // @Column({
  //   nullable: false
  // })
  @OneToMany(
    () => ProductImageEntity,
    (productImageEntity) => productImageEntity.product,
    { cascade: true, eager: true }
  )
  imagens: ProductImageEntity[]

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
    quantidade_disponivel: number,
    descricao: string,
    categoria: string,
    caracteristicas: ProductFeatureEntity[],
    imagens: ProductImageEntity[]
  ) {
    this.id = uuid()
    this.usuarioId = usuarioId
    this.nome = nome
    this.valor = valor
    this.quantidadeDisponivel = quantidade_disponivel
    this.descricao = descricao
    this.caracteristicas = caracteristicas
    this.imagens = imagens
    this.categoria = categoria
  }
}
