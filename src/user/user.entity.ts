import { v4 as uuid } from 'uuid'

export class UserEntity {
  id: string
  nome: string
  email: string
  senha: string

  constructor(nome: string, email: string, senha: string) {
    this.id = uuid()
    this.nome = nome
    this.email = email
    this.senha = senha
  }
}
