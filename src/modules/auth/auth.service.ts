import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from '../user/user.service'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

export interface UserPayload {
  sub: string
  nome: string
}
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}
  async login(email: string, senhaInserida: string) {
    const usuario = await this.userService.searchForEmail(email)

    const usuarioFoiAutenticado = await bcrypt.compare(
      senhaInserida,
      usuario.senha
    )

    if (!usuarioFoiAutenticado)
      throw new UnauthorizedException('E-mail ou senha incorretos.')

    const payload: UserPayload = {
      sub: usuario.id,
      nome: usuario.nome
    }

    return {
      access_token: await this.jwtService.signAsync(payload)
    }
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
