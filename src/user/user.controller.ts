import { Body, Controller, Get, Post } from '@nestjs/common'
import { UserRepository } from './user.repository'
import { CreateUserDTO } from './dto/createUser.dto'

@Controller('/users')
export class UserController {
  constructor(private userRepository: UserRepository) {}
  @Post()
  async createUser(@Body() userData: CreateUserDTO) {
    this.userRepository.save(userData)
    return { status: 'usuario criado!', userData }
  }

  @Get()
  async listUsers() {
    return this.userRepository.list()
  }
}
