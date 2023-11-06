import {
  CallHandler,
  ConsoleLogger,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common'
import { Request, Response } from 'express'
import { Observable, tap } from 'rxjs'
import { RequestWithUser } from 'src/modules/auth/auth.guard'

@Injectable()
export class LoggerGlobalInterceptor implements NestInterceptor {
  constructor(private nativeLogger: ConsoleLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp()
    const request = httpContext.getRequest<Request | RequestWithUser>()

    const response = httpContext.getResponse<Response>()

    const { path, method } = request

    const { statusCode } = response

    this.nativeLogger.log(`${method} ${path}`)

    const timePreController = Date.now()

    return next.handle().pipe(
      tap(() => {
        if ('usuario' in request) {
          this.nativeLogger.log(
            `Rota acessada pelo usuário ${request.usuario.sub}`
          )
        }
        const routeExecutionTime = Date.now() - timePreController
        this.nativeLogger.log(
          `Resposta: status ${statusCode} - ${routeExecutionTime}ms`
        )
      })
    )
  }
}
