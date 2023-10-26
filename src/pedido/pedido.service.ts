import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PedidoEntity } from './entities/pedido.entity'
import { Repository } from 'typeorm'
import { UserEntity } from '../user/entities/user.entity'
import { StatusPedido } from './enum/statuspedido.enum'
import { CreatePedidoDTO } from './dto/CreatePedido.dto'
import { ItemPedidoEntity } from './entities/itempedido.entity'

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async createPedido(usuarioId: string, dadosDoPedido: CreatePedidoDTO) {
    const user = await this.userRepository.findOneBy({ id: usuarioId })

    const itensPedidoEntidades = dadosDoPedido.itensPedido.map(
      (itemPedido) => new ItemPedidoEntity(10, itemPedido.quantidade)
    )

    const valorTotal = itensPedidoEntidades.reduce(
      (total, item) => total + item.precoVenda * item.quantidade,
      0
    )

    const pedidoEntity = new PedidoEntity(
      valorTotal,
      StatusPedido.EM_PROCESSAMENTO,
      user,
      itensPedidoEntidades
    )

    const pedidoCriado = await this.pedidoRepository.save(pedidoEntity)
    return pedidoCriado
  }

  async findPedidosDoUsuario(usuarioId: string) {
    const pedidos = await this.pedidoRepository.find({
      where: {
        usuario: { id: usuarioId }
      }
      // relations: {
      //   usuario: true
      // }
    })

    return pedidos
  }
}
