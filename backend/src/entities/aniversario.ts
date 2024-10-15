export type AniversarioProps = {
  id: string;
  dataAniversario: Date;
  alunoId: string;
};

export class Aniversario {
  private constructor(readonly props: AniversarioProps) {}

  public static create(dataAniversario: Date, alunoId: string) {
    return new Aniversario({
      id: crypto.randomUUID().toString(),
      dataAniversario,
      alunoId,
    });
  }

  public static with(id: string, dataAniversario: Date, alunoId: string) {
    return new Aniversario({
      id,
      dataAniversario,
      alunoId,
    });
  }

  public get id() {
    return this.props.id;
  }

  public get dataAniversario() {
    return this.props.dataAniversario;
  }

  public get alunoId() {
    return this.props.alunoId;
  }
}
