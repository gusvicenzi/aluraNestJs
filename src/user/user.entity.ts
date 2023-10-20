import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

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

  constructor(nome: string, email: string, senha: string) {
    this.id = uuid()
    this.nome = nome
    this.email = email
    this.senha = senha
  }
}
