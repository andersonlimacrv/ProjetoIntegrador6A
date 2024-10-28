import { DadosMae } from "../../entities/dadosMae";

export type DadosMaeCreateOutputDto = {
  id: string;
  trabalhaFora: boolean;
  comQuemDeixar: string;
  interesseCulinariaCostura: boolean;
  qualProjeto?: string;
  alunoId: string;
};

export type DadosMaeOutputDto = DadosMaeCreateOutputDto;

export type DadosMaeListOutputDto = {
  dadosMaes: {
    id: string;
    trabalhaFora: boolean;
    comQuemDeixar: string;
    interesseCulinariaCostura: boolean;
    alunoId: string;
    qualProjeto?: string;
  }[];
}

export interface DadosMaeService {
  create(
    trabalhaFora: boolean,
    comQuemDeixar: string,
    interesseCulinariaCostura: boolean,
    alunoId: string,
    qualProjeto?: string,
  ): Promise<DadosMaeCreateOutputDto>;

  list(): Promise<DadosMaeListOutputDto>;

  update(
    id: string,
    trabalhaFora: boolean,
    comQuemDeixar: string,
    interesseCulinariaCostura: boolean,
    alunoId: string,
    qualProjeto?: string,
  ): Promise<DadosMaeOutputDto>;

  findById(id: string): Promise<DadosMaeOutputDto>;

  deleteById(id: string): Promise<void>;

  findByAlunoId(alunoId: string): Promise<DadosMaeOutputDto | null>;
}
