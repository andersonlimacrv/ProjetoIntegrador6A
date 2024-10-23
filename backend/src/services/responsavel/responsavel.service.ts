import { Responsavel } from "../../entities/responsavel";

export type ResponsavelCreateOutputDto = {
  id: string;
  parentesco: string;
  familiarId: string;
};

export type ResponsavelOutputDto = ResponsavelCreateOutputDto;

export type ResponsavelListOutputDto = {
  responsaveis: ResponsavelCreateOutputDto[];
};

export interface ResponsavelService {
  create(
    parentesco: string,
    familiarId: string
  ): Promise<ResponsavelCreateOutputDto>;

  list(): Promise<ResponsavelListOutputDto>;

  update(
    id: string,
    parentesco: string,
    familiarId: string
  ): Promise<ResponsavelOutputDto>;

  findById(id: string): Promise<ResponsavelOutputDto>;

  deleteById(id: string): Promise<void>;

  findByFamiliarId(familiarId: string): Promise<ResponsavelOutputDto>;
}
