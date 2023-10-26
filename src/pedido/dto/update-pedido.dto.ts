import { PartialType } from '@nestjs/mapped-types'
import { CreatePedidoDTO } from './CreatePedido.dto'

export class UpdatePedidoDto extends PartialType(CreatePedidoDTO) {}
