import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { PedidoEntity } from './pedido.entity'

@Entity({ name: 'itens_pedido' })
export class ItemPedidoEntity {
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
}
