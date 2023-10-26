import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { PedidoEntity } from './pedido.entity'
import { ProductEntity } from '../../product/entities/product.entity'

@Entity({ name: 'itens_pedido' })
export class ItemPedidoEntity {
  constructor(precoVenda: number, quantidade: number) {
    this.precoVenda = precoVenda
    this.quantidade = quantidade
  }
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    nullable: false
  })
  quantidade: number

  @Column({
    name: 'preco_venda',
    nullable: false
  })
  precoVenda: number

  @ManyToOne(() => PedidoEntity, (pedido) => pedido.itensPedido, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  pedido: PedidoEntity

  @ManyToOne(() => ProductEntity, (produto) => produto.itensPedido, {
    cascade: ['update']
  })
  produto: ProductEntity
}
