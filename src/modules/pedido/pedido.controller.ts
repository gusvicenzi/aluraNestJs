import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards
  // UseFilters
} from '@nestjs/common'
import { PedidoService } from './pedido.service'
import { CreatePedidoDTO } from './dto/CreatePedido.dto'
import { UpdatePedidoDTO } from './dto/UpdatePedido.dto'
import { AuthGuard, RequestWithUser } from '../auth/auth.guard'
// import { ExceptionFilterHttp } from 'src/filters/exceptionFilterHttp'

@UseGuards(AuthGuard)
@Controller('pedidos')
// @UseFilters(ExceptionFilterHttp)
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  create(@Req() req: RequestWithUser, @Body() dadosDoPedido: CreatePedidoDTO) {
    const usuarioId = req.usuario.sub
    return this.pedidoService.createPedido(usuarioId, dadosDoPedido)
  }

  @Get()
  findPedidosDoUsuario(@Req() req: RequestWithUser) {
    const usuarioId = req.usuario.sub
    return this.pedidoService.findPedidosDoUsuario(usuarioId)
  }

  @Get(':pedidoId')
  getPedido(@Param('pedidoId') pedidoId: string, @Req() req: RequestWithUser) {
    const usuarioId = req.usuario.sub
    return this.pedidoService.getPedido(pedidoId, usuarioId)
  }

  @Patch(':pedidoId')
  updatePedido(
    @Req() req: RequestWithUser,
    @Param('pedidoId') pedidoId: string,
    @Body() dadosDeAtualizacaoPedido: UpdatePedidoDTO
  ) {
    const usuarioId = req.usuario.sub
    return this.pedidoService.updatePedido(
      pedidoId,
      dadosDeAtualizacaoPedido,
      usuarioId
    )
  }
}
