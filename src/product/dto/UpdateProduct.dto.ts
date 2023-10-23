import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested
} from 'class-validator'
import { ProductFeatureDTO } from './ProductFeature.dto'
import { ProductImageDTO } from './ProductImage.dto'
import { Type } from 'class-transformer'

export class UpdateProductDTO {
  @IsUUID('4', { message: 'ID do produto é inválido' })
  id: string

  @IsUUID('4', { message: 'ID do usuário é inválido' })
  usuarioId: string

  @IsString({ message: 'Nome precisa ser uma string.' })
  @IsNotEmpty({ message: 'Nome do produto não pode ser vazio' })
  @IsOptional()
  nome: string

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @IsPositive()
  @Min(1, { message: 'O valor precisa ser maior que zero' })
  @IsOptional()
  valor: number

  @IsNumber()
  @Min(1, { message: 'O valor precisa ser maior que zero' })
  @IsInt()
  @IsOptional()
  quantidade: number

  @IsString({ message: 'Descricao precisa ser uma string.' })
  @MaxLength(1000, {
    message: 'Campo description não pode ter mais de 1000 caracteres.'
  })
  @IsOptional()
  descricao: string

  @IsString()
  @IsNotEmpty({ message: 'O campo categoria é obrigatório.' })
  @IsOptional()
  categoria: string

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(3, { message: 'São necessárias ao menos 3 características.' })
  @Type(() => ProductFeatureDTO)
  @IsOptional()
  caracteristicas: ProductFeatureDTO[]

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1, { message: 'É necessário ao menos 1 imagem.' })
  @Type(() => ProductImageDTO)
  @IsOptional()
  imagens: ProductImageDTO[]
}
