import { Module } from '@nestjs/common'
import { UserModule } from './modules/user/user.module'
import { ProductModule } from './modules/product/product.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostgresConfigService } from './config/postgres.config.service'
import { ConfigModule } from '@nestjs/config'
import { PedidoModule } from './modules/pedido/pedido.module'
import { APP_FILTER } from '@nestjs/core'
import { ExceptionFilterGlobal } from './resources/filters/exceptionFilterGlobal'
import { CacheModule } from '@nestjs/cache-manager'

@Module({
  imports: [
    UserModule,
    ProductModule,
    PedidoModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService]
    }),
    CacheModule.register({ isGlobal: true, ttl: 10000 })
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionFilterGlobal
    }
  ]
})
export class AppModule {}
