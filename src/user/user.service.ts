import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './entities/user.entity'
import { Repository } from 'typeorm'
import { ListUserDTO } from './dto/ListUser.dto'
import { UpdateUserDTO } from './dto/UpdateUser.dto'
import { CreateUserDTO } from './dto/CreateUser.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async createUser(userData: CreateUserDTO) {
    const userEntity = new UserEntity(
      userData.nome,
      userData.email,
      userData.senha
    )
    const createdUser = await this.userRepository.save(userEntity)
    return createdUser
  }

  async listUsers() {
    const savedUsers = await this.userRepository.find()

    const usersList = savedUsers.map(
      (user) => new ListUserDTO({ id: user.id, nome: user.nome })
    )

    return usersList
  }

  async searchForEmail(email: string) {
    const checkEmail = await this.userRepository.findOne({
      where: { email }
    })
    return checkEmail
  }

  async updateUser(id: string, userEntity: UpdateUserDTO) {
    return await this.userRepository.update(id, userEntity)
  }

  async deleteUser(id: string) {
    await this.userRepository.delete(id)
  }
}
