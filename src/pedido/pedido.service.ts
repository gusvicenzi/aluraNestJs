import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PedidoEntity } from './entities/pedido.entity'
import { Repository } from 'typeorm'
import { UserEntity } from '../user/entities/user.entity'
import { StatusPedido } from './enum/statuspedido.enum'

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async createPedido(usuarioId: string) {
    const user = await this.userRepository.findOneBy({ id: usuarioId })
    const pedidoEntity = new PedidoEntity(
      0,
      StatusPedido.EM_PROCESSAMENTO,
      user
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
