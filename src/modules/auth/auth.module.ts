import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UserModule } from '../user/user.module'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'SEGREDO',
      global: true,
      signOptions: {
        expiresIn: '72h'
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
