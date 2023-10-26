import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator'
import { ItemPedidoDTO } from './ItemPedido.dto'
import { Type } from 'class-transformer'

export class CreatePedidoDTO {
  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ItemPedidoDTO)
  itensPedido: ItemPedidoDTO[]
}
