import { AlunoFamiliar } from "../../entities/alunoFamiliar";

export interface IAlunoFamiliarRepository {
  save(alunoFamiliar: AlunoFamiliar): Promise<void>;
  findById(id: string): Promise<AlunoFamiliar | null>;
  findByAlunoId(alunoId: string): Promise<AlunoFamiliar[]>;
  findByFamiliarId(familiarId: string): Promise<AlunoFamiliar[]>;
  list(): Promise<AlunoFamiliar[]>;
  deleteById(id: string): Promise<void>;
  update(alunoFamiliar: AlunoFamiliar): Promise<void>;
}
