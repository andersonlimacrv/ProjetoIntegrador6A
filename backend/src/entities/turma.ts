export type TurmaProps = {
  id: string;
  nomeTurma: string;
  idade: number;
  turno: string;
  escola: string;
  rendaMensal: number;
};

export class Turma {
  private constructor(readonly props: TurmaProps) {}

  public static create(
    nomeTurma: string,
    idade: number,
    turno: string,
    escola: string,
    rendaMensal: number
  ) {
    return new Turma({
      id: crypto.randomUUID().toString(),
      nomeTurma,
      idade,
      turno,
      escola,
      rendaMensal,
    });
  }

  public static with(
    id: string,
    nomeTurma: string,
    idade: number,
    turno: string,
    escola: string,
    rendaMensal: number
  ) {
    return new Turma({
      id,
      nomeTurma,
      idade,
      turno,
      escola,
      rendaMensal
    });
  }

  public get id() {
    return this.props.id;
  }

  public get nomeTurma() {
    return this.props.nomeTurma;
  }

  public get idade() {
    return this.props.idade;
  }

  public get turno() {
    return this.props.turno;
  }

  public get escola() {
    return this.props.escola;
  }

  public get rendaMensal() {
    return this.props.rendaMensal;
  }
}
