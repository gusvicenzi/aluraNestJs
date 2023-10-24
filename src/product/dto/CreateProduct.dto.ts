import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested
} from 'class-validator'
import { ProductFeatureDTO } from './ProductFeature.dto'
import { ProductImageDTO } from './ProductImage.dto'
import { Type } from 'class-transformer'

export class CreateProductDTO {
  @IsString({ message: 'usuarioId precisa ser uma string.' })
  @IsUUID(undefined, { message: 'ID de usuário inválido' })
  usuarioId: string

  @IsString({ message: 'Nome precisa ser uma string.' })
  @IsNotEmpty({ message: 'O campo nome é obrigatório.' })
  nome: string

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @Min(1, { message: 'O valor precisa ser maior que zero' })
  valor: number

  @IsNumber()
  @Min(0, {
    message: 'Quantidade mínima inválida'
  })
  quantidadeDisponivel: number

  @IsString({ message: 'Descricao precisa ser uma string.' })
  @IsNotEmpty({ message: 'O campo descricao é obrigatório.' })
  @MaxLength(1000, {
    message: 'Campo description não pode ter mais de 1000 caracteres.'
  })
  descricao: string

  @IsString()
  @IsNotEmpty({ message: 'O campo categoria é obrigatório.' })
  categoria: string

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(3, { message: 'São necessárias ao menos 3 características.' })
  @Type(() => ProductFeatureDTO)
  caracteristicas: ProductFeatureDTO[]

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1, { message: 'É necessário ao menos 1 imagem.' })
  @Type(() => ProductImageDTO)
  imagens: ProductImageDTO[]
}
