import { DadosAdicionais } from "../../entities/dadosAdicionais";

export type DadosAdicionaisCreateOutputDto = {
  id: string;
  cpfNotaFiscal: boolean;
  tipoResidencia: string;
  numeroComodos: number;
  possuiBanheiro: boolean;
  possuiAgua: boolean;
  possuiLuz: boolean;
  alunoId: string;
};

export type DadosAdicionaisOutputDto = DadosAdicionaisCreateOutputDto;

export type DadosAdicionaisListOutputDto = {
  dadosAdicionais: DadosAdicionaisCreateOutputDto[];
};

export interface DadosAdicionaisService {
  create(
    cpfNotaFiscal: boolean,
    tipoResidencia: string,
    numeroComodos: number,
    possuiBanheiro: boolean,
    possuiAgua: boolean,
    possuiLuz: boolean,
    alunoId: string
  ): Promise<DadosAdicionaisCreateOutputDto>;

  list(): Promise<DadosAdicionaisListOutputDto>;

  update(
    id: string,
    cpfNotaFiscal: boolean,
    tipoResidencia: string,
    numeroComodos: number,
    possuiBanheiro: boolean,
    possuiAgua: boolean,
    possuiLuz: boolean,
    alunoId: string
  ): Promise<DadosAdicionaisOutputDto>;

  findById(id: string): Promise<DadosAdicionaisOutputDto>;

  deleteById(id: string): Promise<void>;
}
