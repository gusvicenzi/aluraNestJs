// import { UserEntity } from '../user.entity'

export class ListUserDTO {
  readonly id: string
  readonly nome: string

  // constructor(userEntity: UserEntity) {
  //   this.id = userEntity.id
  //   this.nome = userEntity.nome
  // }

  constructor(id: string, nome: string) {
    this.id = id
    this.nome = nome
  }
}
