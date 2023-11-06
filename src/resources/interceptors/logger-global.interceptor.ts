import {
  CallHandler,
  ConsoleLogger,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common'
import { Request } from 'express'
import { Observable, tap } from 'rxjs'
import { RequestWithUser } from 'src/modules/auth/auth.guard'

@Injectable()
export class LoggerGlobalInterceptor implements NestInterceptor {
  constructor(private nativeLogger: ConsoleLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp()
    const request = httpContext.getRequest<Request | RequestWithUser>()

    return next.handle().pipe(
      tap(() => {
        if ('usuario' in request) {
          this.nativeLogger.log(
            `Rota acessada pelo usuário ${request.usuario.sub}`
          )
        }
      })
    )
  }
}
