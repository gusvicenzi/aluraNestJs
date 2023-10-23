import { IsNotEmpty, IsString } from 'class-validator'
import { ProductEntity } from '../entity/product.entity'

export class ProductFeatureDTO {
  id: string

  @IsNotEmpty({ message: 'O campo nome é obrigatório.' })
  @IsString({ message: 'Nome precisa ser uma string.' })
  nome: string

  @IsNotEmpty({ message: 'O campo descricao é obrigatório.' })
  @IsString({ message: 'Descricao precisa ser uma string.' })
  descricao: string

  product: ProductEntity
}
