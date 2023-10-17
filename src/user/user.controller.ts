import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { UserRepository } from './user.repository'
import { CreateUserDTO } from './dto/CreateUser.dto'
import { UserEntity } from './user.entity'
import { ListUserDTO } from 'src/product/dto/ListUser.dto'
import { UpdateUserDTO } from './dto/updateUser.dto'

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
      message: 'Usuário criado!',
      user: new ListUserDTO(userEntity.id, userEntity.nome)
    }
  }

  @Get()
  async listUsers() {
    const usersList = await this.userRepository.list()

    return usersList.map((user) => new ListUserDTO(user.id, user.nome))
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() userDataToUpdate: UpdateUserDTO
  ) {
    const updatedUser = await this.userRepository.update(id, userDataToUpdate)
    return {
      message: 'Usuário atualizado!',
      user: new ListUserDTO(updatedUser.id, updatedUser.nome)
    }
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const deletedUser = await this.userRepository.delete(id)
    return {
      message: 'Usuário removido com sucesso!',
      user: deletedUser
    }
  }
}
