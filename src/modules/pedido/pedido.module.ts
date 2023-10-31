import { Module } from '@nestjs/common'
import { PedidoService } from './pedido.service'
import { PedidoController } from './pedido.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '../user/entities/user.entity'
import { PedidoEntity } from './entities/pedido.entity'
import { ProductEntity } from '../product/entities/product.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([PedidoEntity, UserEntity, ProductEntity])
  ],
  controllers: [PedidoController],
  providers: [PedidoService]
})
export class PedidoModule {}
