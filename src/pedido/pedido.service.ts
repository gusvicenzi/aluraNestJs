import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PedidoEntity } from './entities/pedido.entity'
import { In, Repository } from 'typeorm'
import { UserEntity } from '../user/entities/user.entity'
import { StatusPedido } from './enum/statuspedido.enum'
import { CreatePedidoDTO } from './dto/CreatePedido.dto'
import { ItemPedidoEntity } from './entities/itempedido.entity'
import { ProductEntity } from '../product/entities/product.entity'
import { UpdatePedidoDTO } from './dto/UpdatePedido.dto'

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProductEntity)
    private readonly produtoRepository: Repository<ProductEntity>
  ) {}

  private async buscaUsuario(id: string) {
    const usuario = await this.userRepository.findOneBy({ id })

    if (usuario === null) throw new NotFoundException('Usuário não encontrado')

    return usuario
  }

  private trataDadosPedido(
    dadosDoPedido: CreatePedidoDTO,
    produtosRelacionados: ProductEntity[]
  ) {
    dadosDoPedido.itensPedido.forEach((itemPedido) => {
      const produtoRelacionado = produtosRelacionados.find(
        (produto) => produto.id === itemPedido.produtoId
      )

      if (produtoRelacionado === undefined)
        throw new NotFoundException(
          `Produto com id ${itemPedido.produtoId} não encontrado`
        )

      if (itemPedido.quantidade > produtoRelacionado.quantidadeDisponivel)
        throw new NotFoundException(
          `A quantidade solicitada (${itemPedido.quantidade}) é maior do que a disponível (${produtoRelacionado.quantidadeDisponivel}) para o produto ${produtoRelacionado.nome}`
        )
    })
  }

  async createPedido(usuarioId: string, dadosDoPedido: CreatePedidoDTO) {
    const usuario = await this.buscaUsuario(usuarioId)
    const produtosIds = dadosDoPedido.itensPedido.map((item) => item.produtoId)

    const produtosRelacionados = await this.produtoRepository.findBy({
      id: In(produtosIds)
    })

    this.trataDadosPedido(dadosDoPedido, produtosRelacionados)

    const itensPedidoEntidades = dadosDoPedido.itensPedido.map((itemPedido) => {
      const produtoRelacionado = produtosRelacionados.find(
        (produto) => produto.id === itemPedido.produtoId
      )

      const itemPedidoEntity = new ItemPedidoEntity(
        produtoRelacionado!.valor,
        itemPedido.quantidade,
        produtoRelacionado!
      )

      itemPedidoEntity.produto.quantidadeDisponivel -= itemPedido.quantidade

      return itemPedidoEntity
    })

    const valorTotal = itensPedidoEntidades.reduce(
      (total, item) => total + item.precoVenda * item.quantidade,
      0
    )

    const pedidoEntity = new PedidoEntity(
      valorTotal,
      StatusPedido.EM_PROCESSAMENTO,
      usuario,
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

  async updatePedido(pedidoId: string, newData: UpdatePedidoDTO) {
    const pedido = await this.pedidoRepository.findOneBy({ id: pedidoId })

    if (pedido === null) throw new NotFoundException('Pedido não encontrado')

    Object.assign(pedido, newData)

    return this.produtoRepository.save(pedido)
  }
}
