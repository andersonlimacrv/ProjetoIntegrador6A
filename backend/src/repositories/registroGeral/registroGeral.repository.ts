import { RegistroGeral } from "../../entities/registroGeral";

export interface RegistroGeralRepository {
  save(registroGeral: RegistroGeral): Promise<void>;
  update(registroGeral: RegistroGeral): Promise<void>;
  findById(id: string): Promise<RegistroGeral | null>;
  findByIdWithAlunoId(id: string): Promise<RegistroGeral | null>;
  list(): Promise<RegistroGeral[]>;
  deleteById(id: string): Promise<void>;
}
