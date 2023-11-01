import { Injectable, PipeTransform } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as bcrypt from 'bcrypt'

@Injectable()
export class HashingPasswordPipe implements PipeTransform {
  constructor(private configService: ConfigService) {}
  async transform(senha: string) {
    const salt = this.configService.get<string>('SALT_PASSWORD')

    const hashedSenha = await bcrypt.hash(senha, salt!)

    return hashedSenha
  }
}
