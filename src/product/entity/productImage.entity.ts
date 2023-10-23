import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ProductEntity } from './product.entity'

@Entity({ name: 'product_images' })
export class ProductImageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 255, nullable: false })
  url: string

  @Column({ length: 255, nullable: false })
  descricao: string

  @ManyToOne(() => ProductEntity, (product) => product.imagens, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  product: ProductEntity

  constructor(url: string, descricao: string) {
    this.url = url
    this.descricao = descricao
  }
}
