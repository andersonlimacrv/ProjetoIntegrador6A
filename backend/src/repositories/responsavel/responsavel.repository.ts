import { Responsavel } from "../../entities/responsavel";

export interface ResponsavelRepository {
  save(responsavel: Responsavel): Promise<void>;
  update(responsavel: Responsavel): Promise<void>;
  findById(id: string): Promise<Responsavel | null>;
  findByFamiliarId(alunoId: string): Promise<Responsavel | null>;
  list(): Promise<Responsavel[]>;
  deleteById(id: string): Promise<void>;
}
