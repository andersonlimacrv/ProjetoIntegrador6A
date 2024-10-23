import { ResponsavelService, ResponsavelListOutputDto, ResponsavelOutputDto } from "../responsavel.service";
import { ResponsavelRepository } from "../../../repositories/responsavel/responsavel.repository";
import { Responsavel } from "../../../entities/responsavel";
import { HttpError} from "../../../api/error/http.error";

export class ResponsavelServiceImplementation implements ResponsavelService {
  private constructor(readonly repository: ResponsavelRepository) {}

  public static build(repository: ResponsavelRepository) {
    return new ResponsavelServiceImplementation(repository);
  }

  public async create(
    parentesco: string,
    familiarId: string
  ): Promise<ResponsavelOutputDto> {
    const responsavel = Responsavel.create(parentesco, familiarId);
    await this.repository.save(responsavel);

    const output: ResponsavelOutputDto = {
      id: responsavel.id,
      parentesco: responsavel.parentesco,
      familiarId: responsavel.familiarId,
    };

    return output;
  }
  public async list(): Promise<ResponsavelListOutputDto> {
    const responsaveis = await this.repository.list();
    const output: ResponsavelListOutputDto = {
      responsaveis: responsaveis.map((r) => ({
        id: r.id,
        parentesco: r.parentesco,
        familiarId: r.familiarId,
      })),
    };

    return output;
  }

  public async deleteById(id: string): Promise<void> {
    const responsavel = await this.repository.findById(id);
    if (!responsavel) {
      throw new HttpError("Responsável não encontrado", 404);
    }
    await this.repository.deleteById(id);
  }

  public async findById(id: string): Promise<ResponsavelOutputDto> {
    const responsavel = await this.repository.findById(id);
    if (!responsavel) {
      throw new HttpError("Responsável não encontrado", 404);
    }
    const output: ResponsavelOutputDto = {
      id: responsavel.id,
      parentesco: responsavel.parentesco,
      familiarId: responsavel.familiarId,
    };
    return output;
  }

  public async update(
    id: string,
    parentesco: string,
    familiarId: string
  ): Promise<ResponsavelOutputDto> {
    const responsavel = await this.repository.findById(id);
    if (!responsavel) {
      throw new HttpError("Responsável não encontrado", 404);
    }
    const newResponsavel = Responsavel.with(id, parentesco, familiarId);
    await this.repository.update(newResponsavel);
    const output: ResponsavelOutputDto = {
      id: newResponsavel.id,
      parentesco: newResponsavel.parentesco,
      familiarId: newResponsavel.familiarId,
    };
    return output;
  }

  public async findByFamiliarId(familiarId: string): Promise<ResponsavelOutputDto> {
    const responsavel = await this.repository.findByFamiliarId(familiarId);
    if (!responsavel) {
      throw new HttpError("Responsável não encontrado", 404);
    }
    const output: ResponsavelOutputDto = {
      id: responsavel.id,
      parentesco: responsavel.parentesco,
      familiarId: responsavel.familiarId,
    };
    return output;
  }
}