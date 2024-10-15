import { Aluno } from "../../entities/aluno";


export type AlunoCreateOutputDto = {
  id: string;
  nome: string;
  genero: string;
  dataNascimento: Date;
};

export type AlunoListOutputDto = {
  alunos: {
    id: string;
    nome: string;
    genero: string;
    dataNascimento: Date;
    telefone: string;
    anoEscolar: string;
    alfabetizado: boolean;
    turmaId: string;
    turno: string;
  }[];
};

export type AlunoUpdateOutputDto = {
  id: string;
  nome: string;
  anoEscolar: string;
  turmaId: string;
  turno: string;
};

export type AlunoDetailOutputDto = {
  id: string;
  nome: string;
  genero: string;
  dataNascimento: Date;
  telefone: string;
  anoEscolar: string;
  alfabetizado: boolean;
  turmaId: string;
  turno: string;
};

export interface AlunoService {
  create(
    nome: string,
    genero: string,
    dataNascimento: Date,
    telefone: string,
    anoEscolar: string,
    alfabetizado: boolean,
    turmaId: string,
    turno: string
  ): Promise<AlunoCreateOutputDto>;

  list(): Promise<AlunoListOutputDto>;

  update(
    id: string,
    nome: string,
    genero: string,
    dataNascimento: Date,
    telefone: string,
    anoEscolar: string,
    alfabetizado: boolean,
    turmaId: string,
    turno: string
  ): Promise<AlunoUpdateOutputDto>;

  findById(id: string): Promise<AlunoDetailOutputDto>;
  deleteById(id: string): Promise<void>;
}
