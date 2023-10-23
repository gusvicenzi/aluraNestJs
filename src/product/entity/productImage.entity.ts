import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'product_images' })
export class ProductImageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 255, nullable: false })
  url: string

  @Column({ length: 255, nullable: false })
  descricao: string

  constructor(url: string, descricao: string) {
    this.url = url
    this.descricao = descricao
  }
}
