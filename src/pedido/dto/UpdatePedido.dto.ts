import { IsEnum } from 'class-validator'
import { StatusPedido } from '../enum/statuspedido.enum'

export class UpdatePedidoDTO {
  @IsEnum(StatusPedido)
  status: StatusPedido
}
