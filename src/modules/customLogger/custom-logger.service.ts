import { ConsoleLogger } from '@nestjs/common'
import { bgMagenta, white } from 'colors'
import { ProductEntity } from '../product/entities/product.entity'
import { appendFileSync } from 'fs'

export class CustomLogger extends ConsoleLogger {
  formataLog(nome: string, quantidade: number, valor: number) {
    return `LOCAL: ${
      this.context
    } - NOME: ${nome} - QUANTIDADE: ${quantidade} - PREÇO: ${valor} - TIMESTAMP ${this.getTimestamp()}`
  }

  logColorido(produto: ProductEntity) {
    const { nome, quantidadeDisponivel, valor } = produto
    const formattedLog = this.formataLog(nome, quantidadeDisponivel, valor)

    console.log(bgMagenta(white(formattedLog)))
  }

  logEmArquivo(produto: ProductEntity) {
    const { nome, quantidadeDisponivel, valor } = produto
    const mensagemFormatada =
      this.formataLog(nome, quantidadeDisponivel, valor) + '\n'

    const caminhoDoLog = './src/modules/customLogger/arquivo.log'
    appendFileSync(caminhoDoLog, mensagemFormatada)
  }
}
