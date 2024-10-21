import { RegistroGeral } from "../../entities/registroGeral";

export type RegistroGeralCreateOutputDto = {
  id: string;
  cpf: string;
  rg: string;
  dataEmissaoRg: Date;
  rendaFamiliar: number;
  bolsaFamilia: boolean;
  direitoImagem: boolean;
  alunoId: string;
  responsavelId: string;
};

export type RegistroGeralOutputDto = RegistroGeralCreateOutputDto;


export type RegistroGeralListOutputDto = {
  registrosGerais: {
    id: string;
    cpf: string;
    rg: string;
    dataEmissaoRg: Date;
    rendaFamiliar: number;
    bolsaFamilia: boolean;
    direitoImagem: boolean;
    alunoId: string;
    responsavelId: string;
  }[];
}

export interface RegistroGeralService {
  create(
    cpf: string,
    rg: string,
    dataEmissaoRg: Date,
    rendaFamiliar: number,
    bolsaFamilia: boolean,
    direitoImagem: boolean,
    alunoId: string,
    responsavelId: string
  ): Promise<RegistroGeralCreateOutputDto>;

  list(): Promise<RegistroGeralListOutputDto>;

  update(
    id: string,
    cpf: string,
    rg: string,
    dataEmissaoRg: Date,
    rendaFamiliar: number,
    bolsaFamilia: boolean,
    direitoImagem: boolean,
    alunoId: string,
    responsavelId: string
  ): Promise<RegistroGeralOutputDto>;

  findById(id: string): Promise<RegistroGeralOutputDto>;

  deleteById(id: string): Promise<void>;
}
