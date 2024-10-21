import {
  FamiliaService,
  FamiliaCreateOutputDto,
  FamiliaOutputDto,
  FamiliaListOutputDto,
} from "../familia.service";
import { FamiliaRepository } from "../../../repositories/familia/familia.repository";
import { Familia } from "../../../entities/familia";
import { HttpError } from "../../../api/error/http.error";

export class FamiliaServiceImplementation implements FamiliaService {
  private constructor(readonly repository: FamiliaRepository) {}

  public static build(repository: FamiliaRepository) {
    return new FamiliaServiceImplementation(repository);
  }

  public async create(
    numeroFilhos: number,
    irmaoInstituicao: boolean,
    alunoId: string
  ): Promise<FamiliaCreateOutputDto> {
    const familia = Familia.create(numeroFilhos, irmaoInstituicao, alunoId);
    await this.repository.save(familia);

    const output: FamiliaCreateOutputDto = {
      id: familia.id,
      numeroFilhos: familia.numeroFilhos,
      irmaoInstituicao: familia.irmaoInstituicao,
      alunoId: familia.alunoId,
    };
    return output;
  }

  public async list(): Promise<FamiliaListOutputDto> {
    const familias = await this.repository.list();
    const output: FamiliaListOutputDto = {
      familias: familias.map((f) => ({
        id: f.id,
        numeroFilhos: f.numeroFilhos,
        irmaoInstituicao: f.irmaoInstituicao,
        alunoId: f.alunoId,
      })),
    };
    return output;
  }

  public async update(
    id: string,
    numeroFilhos: number,
    irmaoInstituicao: boolean,
    alunoId: string
  ): Promise<FamiliaOutputDto> {
    const familia = await this.repository.findById(id);
    if (!familia) {
      throw new HttpError("Família não encontrada", 404);
    }

    const newFamilia = Familia.with(
      id,
      numeroFilhos,
      irmaoInstituicao,
      alunoId
    );
    await this.repository.update(newFamilia);

    const output: FamiliaOutputDto = {
      id: newFamilia.id,
      numeroFilhos: newFamilia.numeroFilhos,
      irmaoInstituicao: newFamilia.irmaoInstituicao,
      alunoId: newFamilia.alunoId,
    };
    return output;
  }

  public async findById(id: string): Promise<FamiliaOutputDto> {
    const familia = await this.repository.findById(id);
    if (!familia) {
      throw new HttpError("Família não encontrada", 404);
    }
    return {
      id: familia.id,
      numeroFilhos: familia.numeroFilhos,
      irmaoInstituicao: familia.irmaoInstituicao,
      alunoId: familia.alunoId,
    };
  }

  public async findByAlunoId(alunoId: string): Promise<FamiliaOutputDto | null> {
    const familia = await this.repository.findByIdWithAlunoId(alunoId);
    if (!familia) {
      throw new HttpError("Família nao encontrada", 404);
    }
    return {
      id: familia.id,
      numeroFilhos: familia.numeroFilhos,
      irmaoInstituicao: familia.irmaoInstituicao,
      alunoId: familia.alunoId,
    };
  }

  public async deleteById(id: string): Promise<void> {
    const familia = await this.repository.findById(id);
    if (!familia) {
      throw new HttpError("Família não encontrada", 404);
    }
    await this.repository.deleteById(id);
  }
}
