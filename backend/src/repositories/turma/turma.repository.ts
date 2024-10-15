import { Turma } from "../../entities/turma";

export interface TurmaRepository {
  save(turma: Turma): Promise<void>;
  findById(id: string): Promise<Turma | null>;
  list(): Promise<Turma[]>;
  update(turma: Turma): Promise<void>;
  deleteById(id: string): Promise<void>;
}
