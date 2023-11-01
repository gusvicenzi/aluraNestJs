import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthenticateDto } from './dto/authenticate.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  create(@Body() { email, senha }: AuthenticateDto) {
    return this.authService.login(email, senha)
  }
}
