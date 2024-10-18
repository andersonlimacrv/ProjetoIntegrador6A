import { Familiar } from "../../entities/familiar";

export interface FamiliarRepository {
  save(familiar: Familiar): Promise<void>;
  update(familiar: Familiar): Promise<void>;
  findById(id: string): Promise<Familiar | null>;
  list(): Promise<Familiar[]>;
  deleteById(id: string): Promise<void>;
}
