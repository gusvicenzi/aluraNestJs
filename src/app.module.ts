import { ClassSerializerInterceptor, Module } from '@nestjs/common'
import { UserModule } from './modules/user/user.module'
import { ProductModule } from './modules/product/product.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostgresConfigService } from './config/postgres.config.service'
import { ConfigModule } from '@nestjs/config'
import { PedidoModule } from './modules/pedido/pedido.module'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { ExceptionFilterGlobal } from './resources/filters/exceptionFilterGlobal'
import { CacheModule } from '@nestjs/cache-manager'
import { redisStore } from 'cache-manager-redis-yet'
import { AuthModule } from './modules/auth/auth.module'

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
    CacheModule.registerAsync({
      useFactory: async () => ({
        store: await redisStore({ ttl: 10 * 1000 })
      }),
      isGlobal: true
    }),
    AuthModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionFilterGlobal
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    }
  ]
})
export class AppModule {}
