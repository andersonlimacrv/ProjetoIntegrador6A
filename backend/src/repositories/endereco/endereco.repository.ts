import { Endereco } from "../../entities/endereco";

export interface EnderecoRepository {
  save(endereco: Endereco): Promise<void>;
  findByAlunoId(alunoId: string): Promise<Endereco | null>;
  update(endereco: Endereco): Promise<void>;
  findById(id: string): Promise<Endereco | null>;
  list(): Promise<Endereco[]>;
  deleteById(id: string): Promise<void>;
}
