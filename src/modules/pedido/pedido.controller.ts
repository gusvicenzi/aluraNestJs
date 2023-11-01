import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards
  // UseFilters
} from '@nestjs/common'
import { PedidoService } from './pedido.service'
import { CreatePedidoDTO } from './dto/CreatePedido.dto'
import { UpdatePedidoDTO } from './dto/UpdatePedido.dto'
import { AuthGuard } from '../auth/auth.guard'
// import { ExceptionFilterHttp } from 'src/filters/exceptionFilterHttp'

@UseGuards(AuthGuard)
@Controller('pedidos')
// @UseFilters(ExceptionFilterHttp)
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

  @Get(':pedidoId')
  getPedido(
    @Param('pedidoId') pedidoId: string,
    @Query('usuarioId') usuarioId: string
  ) {
    return this.pedidoService.getPedido(pedidoId, usuarioId)
  }

  @Patch(':pedidoId')
  updatePedido(
    @Param('pedidoId') pedidoId: string,
    @Body() dadosDeAtualizacaoPedido: UpdatePedidoDTO
  ) {
    return this.pedidoService.updatePedido(pedidoId, dadosDeAtualizacaoPedido)
  }
}
