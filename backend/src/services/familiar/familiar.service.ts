import { Familiar } from "../../entities/familiar";

export type FamiliarCreateOutputDto = {
  id: string;
  nome: string;
  parentesco: string;
  telefone: string;
  autorizadoBuscar: boolean;
  responsavel: boolean;
};

export type FamiliarOutputDto = FamiliarCreateOutputDto;

export type FamiliarListOutputDto = {
  familiares: FamiliarCreateOutputDto[];
};

export interface FamiliarService {
  create(
    nome: string,
    parentesco: string,
    telefone: string,
    autorizadoBuscar: boolean,
    responsavel: boolean
  ): Promise<FamiliarCreateOutputDto>;

  list(): Promise<FamiliarListOutputDto>;

  update(
    id: string,
    nome: string,
    parentesco: string,
    telefone: string,
    autorizadoBuscar: boolean,
    responsavel: boolean
  ): Promise<FamiliarOutputDto>;

  findById(id: string): Promise<FamiliarOutputDto>;

  deleteById(id: string): Promise<void>;
}
