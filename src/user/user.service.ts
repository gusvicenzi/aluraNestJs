import { Injectable, NotFoundException } from '@nestjs/common'
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
    if (!checkEmail) throw new NotFoundException('E-mail não encontrado.')
    return checkEmail
  }

  async updateUser(id: string, userEntity: UpdateUserDTO) {
    const user = await this.userRepository.findOneBy({ id })

    if (!user) throw new NotFoundException('Usuário não encontrado.')

    Object.assign(user, userEntity)

    return this.userRepository.save(user)
  }

  async deleteUser(id: string) {
    const result = await this.userRepository.delete(id)
    if (!result.affected) throw new NotFoundException('Usuário não encontrado.')
  }
}
