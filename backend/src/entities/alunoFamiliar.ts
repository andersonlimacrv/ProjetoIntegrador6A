export type AlunoFamiliarProps = {
  id: string;
  alunoId: string;
  familiarId: string;
};

export class AlunoFamiliar {
  private constructor(readonly props: AlunoFamiliarProps) {}

  public static create(alunoId: string, familiarId: string) {
    return new AlunoFamiliar({
      id: crypto.randomUUID().toString(),
      alunoId,
      familiarId,
    });
  }

  public static with(id: string, alunoId: string, familiarId: string) {
    return new AlunoFamiliar({
      id,
      alunoId,
      familiarId,
    });
  }

  public get id() {
    return this.props.id;
  }

  public get alunoId() {
    return this.props.alunoId;
  }

  public get familiarId() {
    return this.props.familiarId;
  }
}
