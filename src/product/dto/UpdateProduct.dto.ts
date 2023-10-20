import {
  IsArray,
  IsDecimal,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator'
import { ProductFeatureDTO } from './ProductFeature.dto'
import { ProductImageDTO } from './ProductImage.dto'
import { Type } from 'class-transformer'

export class UpdateProductDTO {
  @IsString({ message: 'Nome precisa ser uma string.' })
  @IsOptional()
  nome: string

  @IsNumber()
  @IsPositive()
  @IsDecimal({ decimal_digits: '2' })
  valor: number

  @IsNumber()
  @IsPositive()
  @IsInt()
  quantidade: number

  @IsString({ message: 'Descricao precisa ser uma string.' })
  @MaxLength(1000, {
    message: 'Campo description não pode ter mais de 1000 caracteres.'
  })
  @IsOptional()
  descricao: string

  @IsArray()
  @Type(() => ProductFeatureDTO)
  @MinLength(3, { message: 'São necessárias ao menos 3 características.' })
  caracteristicas: ProductFeatureDTO[]

  @IsArray()
  @Type(() => ProductFeatureDTO)
  @MinLength(1, { message: 'É necessário ao menos 1 imagem.' })
  imagens: ProductImageDTO[]

  @IsOptional()
  categoria: string
}
