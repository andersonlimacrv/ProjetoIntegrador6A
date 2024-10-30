export type AniversarioCreateOutputDto = {
  id: string;
};

export type AniversarioListOutputDto = {
  proximos_aniversarios: {
  id: string;
  proximoAniversario?: Date;
  alunoId: string;
  }[];
};

export type AniversarioOutputDto = {
  id: string;
  dataNascimento: Date;
  proximoAniversario?: Date;
  alunoId: string;
};

export interface IAniversarioService {
  create(
    dataNascimento: Date,
    alunoId: string
  ): Promise<AniversarioCreateOutputDto>;
  list(): Promise<AniversarioListOutputDto>;
  findByAlunoId(alunoId: string): Promise<AniversarioOutputDto | null>;
  findById(id: string): Promise<AniversarioOutputDto | null>;
  update(
    id: string,
    dataNascimento: Date,
    alunoId: string
  ): Promise<AniversarioOutputDto>;
  deleteById(id: string): Promise<void>;
}