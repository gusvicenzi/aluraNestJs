class ListFeatureProductDTO {
  nome: string
  descricao: string
}

class ListImageProductoDTO {
  url: string
  descricao: string
}

export class ListProductoDTO {
  id: string
  usuarioId: string
  nome: string
  valor: number
  quantidade: number
  descricao: string
  categoria: string
  caracteristicas: ListFeatureProductDTO[]
  imagens: ListImageProductoDTO[]
}
