import { Familia } from "../../entities/familia";

export interface FamiliaRepository {
  save(familia: Familia): Promise<void>;
  update(familia: Familia): Promise<void>;
  findById(id: string): Promise<Familia | null>;
  findByIdWithAlunoId(id: string): Promise<Familia | null>;
  list(): Promise<Familia[]>;
  deleteById(id: string): Promise<void>;
}
