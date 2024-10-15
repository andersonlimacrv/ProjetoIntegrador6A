import { Turma } from "../../entities/turma";

export type TurmaCreateOutputDto = {
  id: string;
  nomeTurma: string;
  idade: number;
  turno: string;
  escola: string;
  rendaMensal: number;
};


export type TurmaUpdateOutputDto = {
  id: string;
  nomeTurma: string;
  idade: number;
  turno: string;
  escola: string;
  rendaMensal: number;
}

export type TurmaListOutputDto = {
  turmas: {
    id: string;
    nomeTurma: string;
    idade: number;
    turno: string;
    escola: string;
    rendaMensal: number;
  }[];
}

export interface TurmaService {
  create(
    nomeTurma: string,
    idade: number,
    turno: string,
    escola: string,
    rendaMensal: number
  ): Promise<TurmaCreateOutputDto>;
  list(): Promise<TurmaListOutputDto>;
  update(
    id: string,
    nomeTurma: string,
    idade: number,
    turno: string,
    escola: string,
    rendaMensal: number
  ): Promise<TurmaUpdateOutputDto>;
  findById(id: string): Promise<TurmaUpdateOutputDto>;
  deleteById(id: string): Promise<void>;
}