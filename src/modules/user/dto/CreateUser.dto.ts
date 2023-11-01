import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength
} from 'class-validator'
import { IsEmailUnique } from '../validation/isEmailUnique.validator'

export class CreateUserDTO {
  @IsString({ message: 'Nome precisa ser uma string.' })
  @IsNotEmpty({ message: 'O campo nome é obrigatório.' })
  nome: string

  @IsEmail(undefined, { message: 'E-mail inválido.' })
  @IsEmailUnique({ message: 'E-mail já cadastrado.' })
  email: string

  @MinLength(8, { message: 'A senha precisa ter ao menos 8 caracteres.' })
  @MaxLength(30, { message: 'A senha precisa ter no máximmo 30 caracteres.' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W+).{6,30}$/, {
    message:
      'A senha deve possuir ao menos 1 letra minúscula, 1 letra maiúscula, 1 dígito numérico e um caractere especial.'
  })
  senha: string
}
