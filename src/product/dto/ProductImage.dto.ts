import { IsNotEmpty, IsString } from 'class-validator'

export class ProductImageDTO {
  @IsNotEmpty({ message: 'O campo url é obrigatório.' })
  @IsString({ message: 'Url precisa ser uma string.' })
  url: string

  @IsNotEmpty({ message: 'O campo descricao é obrigatório.' })
  @IsString({ message: 'Descricao precisa ser uma string.' })
  descricao: string
}
