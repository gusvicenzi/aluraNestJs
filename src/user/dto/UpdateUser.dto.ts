import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'
import { IsEmailUnique } from '../validation/isEmailUnique.validator'

export class UpdateUserDTO {
  @IsString({ message: 'Nome precisa ser uma string.' })
  @IsOptional()
  nome: string

  @IsEmail(undefined, { message: 'E-mail inválido.' })
  @IsEmailUnique({ message: 'E-mail já cadastrado.' })
  @IsOptional()
  email: string

  @MinLength(6, { message: 'A senha precisa ter ao menos 6 caracteres.' })
  @IsOptional()
  senha: string
}
