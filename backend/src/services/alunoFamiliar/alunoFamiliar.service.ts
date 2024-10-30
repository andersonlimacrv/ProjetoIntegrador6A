export type AlunoFamiliarCreateOutputDto = {
  id: string;
  alunoId: string;
  familiarId: string;
};

export type AlunoFamiliarListOutputDto = {
  alunosFamiliares: {
    id: string;
    alunoId: string;
    familiarId: string;
  }[];
};

export type AlunoFamiliarOutputDto = {
  id: string;
  alunoId: string;
  familiarId: string;
};

export interface IAlunoFamiliarService {
  create(
    alunoId: string,
    familiarId: string
  ): Promise<AlunoFamiliarCreateOutputDto>;

  list(): Promise<AlunoFamiliarListOutputDto>;
  deleteById(id: string): Promise<void>;
  update(
    id: string,
    alunoId: string,
    familiarId: string
  ): Promise<AlunoFamiliarOutputDto>;
  findByAlunoId(alunoId: string): Promise<AlunoFamiliarOutputDto[]>;
  findByFamiliarId(familiarId: string): Promise<AlunoFamiliarOutputDto[]>;
  findById(id: string): Promise<AlunoFamiliarOutputDto | null>;
}
