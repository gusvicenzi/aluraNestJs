import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne
} from 'typeorm'
import { StatusPedido } from '../enum/statuspedido.enum'
import { UserEntity } from '../../user/entities/user.entity'

@Entity({ name: 'pedidos' })
export class PedidoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    name: 'valor_total',
    nullable: false
  })
  valorTotal: number

  @Column({
    enum: StatusPedido,
    nullable: false
  })
  status: StatusPedido

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string

  @ManyToOne(() => UserEntity, (user) => user.pedidos, { eager: true })
  usuario: UserEntity

  constructor(valorTotal: number, status: StatusPedido, usuario: UserEntity) {
    this.valorTotal = valorTotal
    this.status = status
    this.usuario = usuario
  }
}
