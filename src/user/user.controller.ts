import { Body, Controller, Get, Post } from '@nestjs/common'
import { UserRepository } from './user.repository'
import { CreateUserDTO } from './dto/createUser.dto'
import { UserEntity } from './user.entity'
import { ListUserDTO } from 'src/product/dto/ListUser.dto'

@Controller('/users')
export class UserController {
  constructor(private userRepository: UserRepository) {}
  @Post()
  async createUser(@Body() userData: CreateUserDTO) {
    const userEntity = new UserEntity(
      userData.nome,
      userData.email,
      userData.senha
    )

    this.userRepository.save(userEntity)
    return {
      message: 'usuario criado!',
      user: new ListUserDTO(userEntity.id, userEntity.nome)
    }
  }

  @Get()
  async listUsers() {
    const usersList = await this.userRepository.list()

    return usersList.map((user) => new ListUserDTO(user.id, user.nome))
  }
}
