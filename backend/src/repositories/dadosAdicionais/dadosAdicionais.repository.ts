import { DadosAdicionais } from "../../entities/dadosAdicionais";

export interface DadosAdicionaisRepository {
  save(dadosAdicionais: DadosAdicionais): Promise<void>;
  update(dadosAdicionais: DadosAdicionais): Promise<void>;
  findById(id: string): Promise<DadosAdicionais | null>;
  findyByAlunoId(alunoId: string): Promise<DadosAdicionais | null>;
  list(): Promise<DadosAdicionais[]>;
  deleteById(id: string): Promise<void>;
}
