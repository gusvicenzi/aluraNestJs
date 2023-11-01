import { Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class HashingPasswordPipe implements PipeTransform {
  transform(senha: string) {
    return senha + 'abcdef'
  }
}
