import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserController } from './user.controller'
import { IsEmailUniqueValidator } from './validation/isEmailUnique.validator'
import { UserEntity } from './entities/user.entity'
import { UserService } from './user.service'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [IsEmailUniqueValidator, UserService],
  exports: [UserService]
})
export class UserModule {}
