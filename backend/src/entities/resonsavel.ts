export type ResponsavelProps = {
  id: string;
  parentesco: string;
  familiarId: string;
};

export class Responsavel {
  private constructor(readonly props: ResponsavelProps) {}

  public static create(parentesco: string, familiarId: string) {
    return new Responsavel({
      id: crypto.randomUUID().toString(),
      parentesco,
      familiarId,
    });
  }

  public static with(id: string, parentesco: string, familiarId: string) {
    return new Responsavel({
      id,
      parentesco,
      familiarId,
    });
  }

  public get id() {
    return this.props.id;
  }

  public get parentesco() {
    return this.props.parentesco;
  }

  public get familiarId() {
    return this.props.familiarId;
  }
}
