export type DadosMaeProps = {
  id: string;
  trabalhaFora: boolean;
  comQuemDeixar: string;
  interesseCulinariaCostura: boolean;
  qualProjeto?: string;
  alunoId: string;
};

export class DadosMae {
  private constructor(readonly props: DadosMaeProps) {}

  public static create(
    trabalhaFora: boolean,
    comQuemDeixar: string,
    interesseCulinariaCostura: boolean,
    alunoId: string,
    qualProjeto?: string
  ) {
    return new DadosMae({
      id: crypto.randomUUID().toString(),
      trabalhaFora,
      comQuemDeixar,
      interesseCulinariaCostura,
      qualProjeto,
      alunoId,
    });
  }

  public static with(
    id: string,
    trabalhaFora: boolean,
    comQuemDeixar: string,
    interesseCulinariaCostura: boolean,
    alunoId: string,
    qualProjeto?: string
  ) {
    return new DadosMae({
      id,
      trabalhaFora,
      comQuemDeixar,
      interesseCulinariaCostura,
      qualProjeto,
      alunoId,
    });
  }

  public get id() {
    return this.props.id;
  }

  public get trabalhaFora() {
    return this.props.trabalhaFora;
  }

  public get comQuemDeixar() {
    return this.props.comQuemDeixar;
  }

  public get interesseCulinariaCostura() {
    return this.props.interesseCulinariaCostura;
  }

  public get qualProjeto() {
    return this.props.qualProjeto;
  }

  public get alunoId() {
    return this.props.alunoId;
  }
}
