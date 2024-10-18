import { Familia } from "../../entities/familia";
import { Aluno } from "../../entities/aluno";

export type FamiliaCreateOutputDto = {
  id: string;
  numeroFilhos: number;
  irmaoInstituicao: boolean;
  alunoId: string;
};

export type FamiliaOutputDto = FamiliaCreateOutputDto;

export type FamiliaListOutputDto = {
  familias: FamiliaCreateOutputDto[];
};

export interface FamiliaService {
  create(
    numeroFilhos: number,
    irmaoInstituicao: boolean,
    alunoId: string
  ): Promise<FamiliaCreateOutputDto>;

  list(): Promise<FamiliaListOutputDto>;

  update(
    id: string,
    numeroFilhos: number,
    irmaoInstituicao: boolean,
    alunoId: string
  ): Promise<FamiliaOutputDto>;

  findById(id: string): Promise<FamiliaOutputDto>;

  deleteById(id: string): Promise<void>;

  findByAlunoId(alunoId: string): Promise<FamiliaOutputDto | null>;
}
