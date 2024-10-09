
export type EnderecoProps = {
  id: string
  cep: string
  logradouro: string
  logradouroNumero: string
  complemento?: string
  bairro: string
  cidade: string
  uf: string
  alunoId: string
}

export class Endereco {
  private constructor(readonly props: EnderecoProps) {}

  public static create(
    cep: string,
    logradouro: string,
    logradouroNumero: string,
    bairro: string,
    cidade: string,
    uf: string,
    alunoId: string,
    complemento?: string,
  ) {
    return new Endereco({
      id: crypto.randomUUID().toString(),
      cep,
      logradouro,
      logradouroNumero,
      bairro,
      cidade,
      uf,
      alunoId, 
      complemento: complemento ?? '',
    })
  }

  public static with(
    id: string,
    cep: string,
    logradouro: string,
    logradouroNumero: string,
    bairro: string,
    cidade: string,
    uf: string,
    alunoId: string,
    complemento?: string,
  ) {
    return new Endereco({
      id,
      cep,
      logradouro,
      logradouroNumero,
      bairro,
      cidade,
      uf,
      alunoId,
      complemento: complemento ?? '',
    })
  }

  public get id() {
    return this.props.id
  }

  public get cep() {
    return this.props.cep
  }

  public get logradouro() {
    return this.props.logradouro
  }

  public get logradouroNumero() {
    return this.props.logradouroNumero
  }

  public get bairro() {
    return this.props.bairro
  }

  public get cidade() {
    return this.props.cidade
  }

  public get uf() {
    return this.props.uf
  }

  public get complemento() {
    return this.props.complemento
  }

  public get alunoId() {
    return this.props.alunoId
  }

}