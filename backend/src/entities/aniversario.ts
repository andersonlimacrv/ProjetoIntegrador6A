export type AniversarioProps = {
  id: string;
  dataNascimento: Date;
  proximoAniversario?: Date;
  alunoId: string;
};

export class Aniversario {
  private constructor(readonly props: AniversarioProps) {}

  public static create(dataNascimento: Date, alunoId: string) {
    const proximoAniversario =
      Aniversario.calcularProximoAniversario(dataNascimento);
    return new Aniversario({
      id: crypto.randomUUID().toString(),
      dataNascimento,
      proximoAniversario,
      alunoId,
    });
  }

  public static with(
    id: string,
    dataNascimento: Date,
    alunoId: string,
    proximoAniversario?: Date
  ) {
    return new Aniversario({
      id,
      dataNascimento,
      proximoAniversario,
      alunoId,
    });
  }

  public static calcularProximoAniversario(dataNascimento: Date): Date {
    const today = new Date();
    const anoAtual = today.getFullYear();
    const aniversarioEsteAno = new Date(
      anoAtual,
      dataNascimento.getMonth(),
      dataNascimento.getDate()
    );

    if (aniversarioEsteAno < today) {
      aniversarioEsteAno.setFullYear(anoAtual + 1);
    }
    return aniversarioEsteAno;
  }

  public atualizarProximoAniversario() {
    this.props.proximoAniversario = Aniversario.calcularProximoAniversario(
      this.props.dataNascimento
    );
  }

  public get id() {
    return this.props.id;
  }

  public get dataNascimento() {
    return this.props.dataNascimento;
  }

  public get proximoAniversario() {
    return this.props.proximoAniversario;
  }

  public get alunoId() {
    return this.props.alunoId;
  }
}
