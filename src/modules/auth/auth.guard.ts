import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { UserPayload } from './auth.service'

export interface RequestWithUser extends Request {
  usuario: UserPayload
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>()

    const access_token = this.extractTokenFromHeader(request)

    if (!access_token) throw new UnauthorizedException('Erro de autenticação')

    try {
      const payload: UserPayload =
        await this.jwtService.verifyAsync(access_token)

      request.usuario = payload
      console.log(payload)

      return false
    } catch (error) {
      console.error(error)
      throw new UnauthorizedException('JWT inválido')
    }
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [tipo, token] = request.headers.authorization?.split(' ') ?? []

    return tipo === 'Bearer' ? token : undefined
  }
}
