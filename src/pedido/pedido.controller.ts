import { Controller, Get, Post, Query } from '@nestjs/common'
import { PedidoService } from './pedido.service'

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  create(@Query('usuarioId') usuarioId: string) {
    return this.pedidoService.createPedido(usuarioId)
  }

  @Get()
  findPedidosDoUsuario(@Query('usuarioId') usuarioId: string) {
    return this.pedidoService.findPedidosDoUsuario(usuarioId)
  }
}
