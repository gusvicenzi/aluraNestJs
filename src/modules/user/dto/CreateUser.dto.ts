import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'
import { IsEmailUnique } from '../validation/isEmailUnique.validator'

export class CreateUserDTO {
  @IsString({ message: 'Nome precisa ser uma string.' })
  @IsNotEmpty({ message: 'O campo nome é obrigatório.' })
  nome: string

  @IsEmail(undefined, { message: 'E-mail inválido.' })
  @IsEmailUnique({ message: 'E-mail já cadastrado.' })
  email: string

  @MinLength(6, { message: 'A senha precisa ter ao menos 6 caracteres.' })
  senha: string
}
