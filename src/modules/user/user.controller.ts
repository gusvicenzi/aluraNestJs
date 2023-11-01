import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CreateUserDTO } from './dto/CreateUser.dto'
import { UpdateUserDTO } from './dto/UpdateUser.dto'
import { ListUserDTO } from './dto/ListUser.dto'
import { UserService } from './user.service'
import { HashingPasswordPipe } from '../../resources/pipes/hashing-password.pipe'

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() { senha, ...userData }: CreateUserDTO,
    @Body('senha', HashingPasswordPipe) hashedSenha: string
  ) {
    const createdUser = await this.userService.createUser({
      ...userData,
      senha: hashedSenha
    })

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() { senha, ...userDataToUpdate }: UpdateUserDTO,
    @Body('senha', HashingPasswordPipe) hashedSenha: string
  ) {
    await this.userService.updateUser(id, {
      senha: hashedSenha,
      ...userDataToUpdate
    })

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
