import { DadosMae } from "../../entities/dadosMae";

export interface DadosMaeRepository {
  save(dadosMae: DadosMae): Promise<void>;
  update(dadosMae: DadosMae): Promise<void>;
  findById(id: string): Promise<DadosMae | null>;
  findByIdWithAlunoId(id: string): Promise<DadosMae | null>;
  list(): Promise<DadosMae[]>;
  deleteById(id: string): Promise<void>;
  findByAlunoId(alunoId: string): Promise<DadosMae | null>;
}
