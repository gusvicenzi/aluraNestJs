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
import { ItemPedidoEntity } from '../../pedido/entities/itempedido.entity'

@Entity({ name: 'products' })
export class ProductEntity {
  constructor(
    nome: string,
    valor: number,
    quantidade_disponivel: number,
    descricao: string,
    categoria: string,
    caracteristicas: ProductFeatureEntity[],
    imagens: ProductImageEntity[]
  ) {
    this.id = uuid()
    this.nome = nome
    this.valor = valor
    this.quantidadeDisponivel = quantidade_disponivel
    this.descricao = descricao
    this.caracteristicas = caracteristicas
    this.imagens = imagens
    this.categoria = categoria
  }

  @PrimaryGeneratedColumn('uuid')
  id: string

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

  @OneToMany(
    () => ProductFeatureEntity,
    (productFeatureEntity) => productFeatureEntity.product,
    { cascade: true, eager: true }
  )
  caracteristicas: ProductFeatureEntity[]

  @OneToMany(
    () => ProductImageEntity,
    (productImageEntity) => productImageEntity.product,
    { cascade: true, eager: true }
  )
  imagens: ProductImageEntity[]

  @OneToMany(() => ItemPedidoEntity, (itemPedido) => itemPedido.produto)
  itensPedido: ItemPedidoEntity[]

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string
}
