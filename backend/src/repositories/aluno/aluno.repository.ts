

import { Aluno } from "../../entities/aluno";

export interface AlunoRepository {
  save(aluno: Aluno): Promise<void>;
  update(aluno: Aluno): Promise<void>;
  findById(id: string): Promise<Aluno | null>;
  list(): Promise<Aluno[]>;
  deleteById(id: string): Promise<void>;
}