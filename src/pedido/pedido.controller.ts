import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { PedidoService } from './pedido.service'
import { CreatePedidoDTO } from './dto/CreatePedido.dto'

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  create(
    @Query('usuarioId') usuarioId: string,
    @Body() dadosDoPedido: CreatePedidoDTO
  ) {
    return this.pedidoService.createPedido(usuarioId, dadosDoPedido)
  }

  @Get()
  findPedidosDoUsuario(@Query('usuarioId') usuarioId: string) {
    return this.pedidoService.findPedidosDoUsuario(usuarioId)
  }
}
