import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { ProductModule } from './product/product.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostgresConfigService } from './config/postgres.config.service'
import { ConfigModule } from '@nestjs/config'
import { PedidoModule } from './pedido/pedido.module'
import { APP_FILTER } from '@nestjs/core'
import { ExceptionFilterHttp } from './filters/exceptionFilterHttp'

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
    })
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionFilterHttp
    }
  ]
})
export class AppModule {}
