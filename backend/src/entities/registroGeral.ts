export type RegistroGeralProps = {
  id: string;
  cpf: string;
  rg: string;
  dataEmissaoRg: Date;
  rendaFamiliar: number;
  bolsaFamilia: boolean;
  direitoImagem: boolean;
  alunoId: string;
  responsavelId: string;
};

export class RegistroGeral {
  private constructor(readonly props: RegistroGeralProps) {}

  public static create(
    cpf: string,
    rg: string,
    dataEmissaoRg: Date,
    rendaFamiliar: number,
    bolsaFamilia: boolean,
    direitoImagem: boolean,
    alunoId: string,
    responsavelId: string
  ) {
    return new RegistroGeral({
      id: crypto.randomUUID().toString(),
      cpf,
      rg,
      dataEmissaoRg,
      rendaFamiliar,
      bolsaFamilia,
      direitoImagem,
      alunoId,
      responsavelId,
    });
  }

  public static with(
    id: string,
    cpf: string,
    rg: string,
    dataEmissaoRg: Date,
    rendaFamiliar: number,
    bolsaFamilia: boolean,
    direitoImagem: boolean,
    alunoId: string,
    responsavelId: string
  ) {
    return new RegistroGeral({
      id,
      cpf,
      rg,
      dataEmissaoRg,
      rendaFamiliar,
      bolsaFamilia,
      direitoImagem,
      alunoId,
      responsavelId,
    });
  }

  public get id() {
    return this.props.id;
  }

  public get cpf() {
    return this.props.cpf;
  }

  public get rg() {
    return this.props.rg;
  }

  public get dataEmissaoRg() {
    return this.props.dataEmissaoRg;
  }

  public get rendaFamiliar() {
    return this.props.rendaFamiliar;
  }

  public get bolsaFamilia() {
    return this.props.bolsaFamilia;
  }

  public get direitoImagem() {
    return this.props.direitoImagem;
  }

  public get alunoId() {
    return this.props.alunoId;
  }

  public get responsavelId() {
    return this.props.responsavelId;
  }
}
