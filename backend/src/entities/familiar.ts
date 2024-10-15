export type FamiliarProps = {
  id: string;
  nome: string;
  parentesco: string;
  telefone: string;
  autorizadoBuscar: boolean;
  responsavel: boolean;
};

export class Familiar {
  private constructor(readonly props: FamiliarProps) {}

  public static create(
    nome: string,
    parentesco: string,
    telefone: string,
    autorizadoBuscar: boolean,
    responsavel: boolean
  ) {
    return new Familiar({
      id: crypto.randomUUID().toString(),
      nome,
      parentesco,
      telefone,
      autorizadoBuscar,
      responsavel,
    });
  }

  public static with(
    id: string,
    nome: string,
    parentesco: string,
    telefone: string,
    autorizadoBuscar: boolean,
    responsavel: boolean
  ) {
    return new Familiar({
      id,
      nome,
      parentesco,
      telefone,
      autorizadoBuscar,
      responsavel,
    });
  }

  public get id() {
    return this.props.id;
  }

  public get nome() {
    return this.props.nome;
  }

  public get parentesco() {
    return this.props.parentesco;
  }

  public get telefone() {
    return this.props.telefone;
  }

  public get autorizadoBuscar() {
    return this.props.autorizadoBuscar;
  }

  public get responsavel() {
    return this.props.responsavel;
  }

  public atualizarTelefone(novoTelefone: string) {
    this.props.telefone = novoTelefone;
  }
}
