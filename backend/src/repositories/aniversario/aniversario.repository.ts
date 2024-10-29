import { Aniversario } from "../../entities/aniversario";

export interface IAniversarioRepository {
  save(aniversario: Aniversario): Promise<void>;
  findById(id: string): Promise<Aniversario | null>;
  findByAlunoId(alunoId: string): Promise<Aniversario | null>;
  list(): Promise<Aniversario[]>;
  update(aniversario: Aniversario): Promise<void>;
  deleteById(id: string): Promise<void>;
}
