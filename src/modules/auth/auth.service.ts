import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthService {
  login(email: string, senha: string) {
    return console.log(email, senha)
  }

  // findAll() {
  //   return `This action returns all auth`
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`
  // }
}
