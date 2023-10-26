import { IsInt } from 'class-validator'

export class ItemPedidoDTO {
  @IsInt()
  quantidade: number
}
