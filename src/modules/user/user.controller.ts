import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CreateUserDTO } from './dto/CreateUser.dto'
import { UpdateUserDTO } from './dto/UpdateUser.dto'
import { ListUserDTO } from './dto/ListUser.dto'
import { UserService } from './user.service'

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() userData: CreateUserDTO) {
    const createdUser = await this.userService.createUser(userData)
    return {
      message: 'Usuário criado!',
      user: new ListUserDTO({ id: createdUser.id, nome: createdUser.nome })
    }
  }

  @Get()
  async listUsers() {
    const usersList = await this.userService.listUsers()

    return usersList
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() userDataToUpdate: UpdateUserDTO
  ) {
    await this.userService.updateUser(id, userDataToUpdate)
    return {
      message: 'Usuário atualizado!',
      user: new ListUserDTO({ id, nome: userDataToUpdate.nome })
    }
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const deletedUser = await this.userService.deleteUser(id)
    return {
      message: 'Usuário removido com sucesso!',
      user: deletedUser
    }
  }
}
