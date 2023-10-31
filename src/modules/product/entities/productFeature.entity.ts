import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ProductEntity } from './product.entity'

@Entity({ name: 'product_features' })
export class ProductFeatureEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

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

  @ManyToOne(() => ProductEntity, (product) => product.caracteristicas, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  product: ProductEntity

  constructor(nome: string, descricao: string) {
    this.nome = nome
    this.descricao = descricao
  }
}
