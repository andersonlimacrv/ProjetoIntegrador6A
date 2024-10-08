export type AlunoProps = {
  id: string;
  nome: string;
  genero: string;
  dataNascimento: Date;
  telefone: string;
  anoEscolar: string;
  alfabetizado: boolean;
  turno: string;
  turma: string;
};

export class Aluno {
  private constructor(readonly props: AlunoProps) {}

  public static create(
    nome: string,
    genero: string,
    dataNascimento: Date,
    telefone: string,
    anoEscolar: string,
    alfabetizado: boolean,
    turno: string,
    turma: string
  ) {
    return new Aluno({
      id: crypto.randomUUID().toString(),
      nome,
      genero,
      dataNascimento,
      telefone,
      anoEscolar,
      alfabetizado,
      turno,
      turma,
    });
  }

  
  public static with(
    id: string,
    nome: string,
    genero: string,
    dataNascimento: Date,
    telefone: string,
    anoEscolar: string,
    alfabetizado: boolean,
    turno: string,
    turma: string
  ) {
    return new Aluno({
      id,
      nome,
      genero,
      dataNascimento,
      telefone,
      anoEscolar,
      alfabetizado,
      turno,
      turma,
    });
  }

  // Getters para acessar os dados de forma encapsulada
  public get id() {
    return this.props.id;
  }

  public get nome() {
    return this.props.nome;
  }

  public get genero() {
    return this.props.genero;
  }

  public get dataNascimento() {
    return this.props.dataNascimento;
  }

  public get telefone() {
    return this.props.telefone;
  }

  public get anoEscolar() {
    return this.props.anoEscolar;
  }

  public get alfabetizado() {
    return this.props.alfabetizado;
  }

  public get turno() {
    return this.props.turno;
  }

  public get turma() {
    return this.props.turma;
  }


  public atualizarTelefone(novoTelefone: string) {
    this.props.telefone = novoTelefone;
  }

  public alterarTurma(novaTurma: string) {
    this.props.turma = novaTurma;
  }

  public alterarTurno(novoTurno: string) {
    this.props.turno = novoTurno;
  }

  public promoverAnoEscolar(novoAno: string) {
    this.props.anoEscolar = novoAno;
  }

  public atualizarAlfabetizacao(status: boolean) {
    this.props.alfabetizado = status;
  }
}
