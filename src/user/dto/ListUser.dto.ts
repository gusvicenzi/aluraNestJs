// import { UserEntity } from '../user.entity'

export class ListUserDTO {
  readonly id: string
  readonly nome: string

  // constructor(userEntity: UserEntity) {
  //   this.id = userEntity.id
  //   this.nome = userEntity.nome
  // }

  constructor({ id, nome }: { id?: string; nome?: string }) {
    if (id) this.id = id
    if (nome) this.nome = nome
  }
}
