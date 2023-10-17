import { Injectable } from '@nestjs/common'
import { UserEntity } from './user.entity'

@Injectable()
export class UserRepository {
  private users: UserEntity[] = []

  private async getUserById(id: string) {
    const possibleUser = this.users.find((user) => user.id === id)

    if (!possibleUser) throw new Error('Usuário não encontrado!')
    return possibleUser
  }
  async save(user: UserEntity) {
    this.users.push(user)
    console.log(this.users)
  }

  async list() {
    return this.users
  }

  async update(id: string, newData: Partial<UserEntity>) {
    const user = await this.getUserById(id)

    Object.entries(newData).forEach(([key, value]) => {
      if (key === 'id') {
        return
      }

      user[key] = value
    })
    return user
  }

  async delete(id: string) {
    const user = await this.getUserById(id)
    this.users = this.users.filter((savedUser) => savedUser.id !== id)
    return user
  }

  async emailAlreadyExists(email: string) {
    const possibleUser = this.users.find((user) => user.email === email)

    return possibleUser !== undefined
  }
}
