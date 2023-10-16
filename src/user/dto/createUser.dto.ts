import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class CreateUserDTO {
  @IsString({ message: 'Nome precisa ser uma string.' })
  @IsNotEmpty({ message: 'O campo nome é obrigatório.' })
  name: string

  @IsEmail(undefined, { message: 'E-mail inválido.' })
  email: string

  @MinLength(6, { message: 'A senha precisa ter ao menos 6 caracteres.' })
  senha: string
}
