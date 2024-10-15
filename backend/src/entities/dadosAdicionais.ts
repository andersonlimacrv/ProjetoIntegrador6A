export type DadosAdicionaisProps = {
  id: string;
  cpfNotaFiscal: boolean;
  tipoResidencia: string;
  numeroComodos: number;
  possuiBanheiro: boolean;
  possuiAgua: boolean;
  possuiLuz: boolean;
  alunoId: string;
};

export class DadosAdicionais {
  private constructor(readonly props: DadosAdicionaisProps) {}

  public static create(
    cpfNotaFiscal: boolean,
    tipoResidencia: string,
    numeroComodos: number,
    possuiBanheiro: boolean,
    possuiAgua: boolean,
    possuiLuz: boolean,
    alunoId: string
  ) {
    return new DadosAdicionais({
      id: crypto.randomUUID().toString(),
      cpfNotaFiscal,
      tipoResidencia,
      numeroComodos,
      possuiBanheiro,
      possuiAgua,
      possuiLuz,
      alunoId,
    });
  }

  public static with(
    id: string,
    cpfNotaFiscal: boolean,
    tipoResidencia: string,
    numeroComodos: number,
    possuiBanheiro: boolean,
    possuiAgua: boolean,
    possuiLuz: boolean,
    alunoId: string
  ) {
    return new DadosAdicionais({
      id,
      cpfNotaFiscal,
      tipoResidencia,
      numeroComodos,
      possuiBanheiro,
      possuiAgua,
      possuiLuz,
      alunoId,
    });
  }

  public get id() {
    return this.props.id;
  }

  public get cpfNotaFiscal() {
    return this.props.cpfNotaFiscal;
  }

  public get tipoResidencia() {
    return this.props.tipoResidencia;
  }

  public get numeroComodos() {
    return this.props.numeroComodos;
  }

  public get possuiBanheiro() {
    return this.props.possuiBanheiro;
  }

  public get possuiAgua() {
    return this.props.possuiAgua;
  }

  public get possuiLuz() {
    return this.props.possuiLuz;
  }

  public get alunoId() {
    return this.props.alunoId;
  }
}
