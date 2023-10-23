import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './user.entity'
import { Repository } from 'typeorm'
import { ListUserDTO } from './dto/ListUser.dto'
import { UpdateUserDTO } from './dto/UpdateUser.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async createUser(userEntity: UserEntity) {
    await this.userRepository.save(userEntity)
  }

  async listUsers() {
    const savedUsers = await this.userRepository.find()

    const usersList = savedUsers.map(
      (user) => new ListUserDTO(user.id, user.nome)
    )

    return usersList
  }

  async updateUser(id: string, userEntity: UpdateUserDTO) {
    await this.userRepository.update(id, userEntity)
  }

  async deleteUser(id: string) {
    await this.userRepository.delete(id)
  }
}
