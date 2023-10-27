import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common'
import { PedidoService } from './pedido.service'
import { CreatePedidoDTO } from './dto/CreatePedido.dto'
import { UpdatePedidoDTO } from './dto/UpdatePedido.dto'

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

  @Patch()
  updatePedido(
    @Query('pedidoId') pedidoId: string,
    @Body() dadosDeAtualizacaoPedido: UpdatePedidoDTO
  ) {
    return this.pedidoService.updatePedido(pedidoId, dadosDeAtualizacaoPedido)
  }
}
