import { Exclude } from 'class-transformer'
import { PedidoEntity } from '../../pedido/entities/pedido.entity'
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany
} from 'typeorm'

// Exclude()
@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  // Expose()
  @Column({
    length: 100,
    nullable: false
  })
  nome: string

  @Column({
    length: 70,
    nullable: false
  })
  email: string

  @Exclude()
  @Column({
    length: 255,
    nullable: false
  })
  senha: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string

  @OneToMany(() => PedidoEntity, (pedido) => pedido.usuario)
  pedidos: PedidoEntity[]
}
