export type FamiliaProps = {
  id: string;
  numeroFilhos: number;
  irmaoInstituicao: boolean;
  alunoId: string;
};

export class Familia {
  private constructor(readonly props: FamiliaProps) {}

  public static create(
    numeroFilhos: number,
    irmaoInstituicao: boolean,
    alunoId: string
  ) {
    return new Familia({
      id: crypto.randomUUID().toString(),
      numeroFilhos,
      irmaoInstituicao,
      alunoId,
    });
  }

  public static with(
    id: string,
    numeroFilhos: number,
    irmaoInstituicao: boolean,
    alunoId: string
  ) {
    return new Familia({
      id,
      numeroFilhos,
      irmaoInstituicao,
      alunoId,
    });
  }

  public get id() {
    return this.props.id;
  }

  public get numeroFilhos() {
    return this.props.numeroFilhos;
  }

  public get irmaoInstituicao() {
    return this.props.irmaoInstituicao;
  }

  public get alunoId() {
    return this.props.alunoId;
  }
}
