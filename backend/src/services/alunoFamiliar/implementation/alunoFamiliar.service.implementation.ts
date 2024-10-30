import {
  IAlunoFamiliarService,
  AlunoFamiliarCreateOutputDto,
  AlunoFamiliarListOutputDto,
  AlunoFamiliarOutputDto,
} from "../alunoFamiliar.service";
import { IAlunoFamiliarRepository } from "../../../repositories/alunoFamiliar/alunoFamiliar.repository";
import { AlunoFamiliar } from "../../../entities/alunoFamiliar";
import { HttpError } from "../../../api/error/http.error";

export class AlunoFamiliarServiceImplementation
  implements IAlunoFamiliarService
{
  private constructor(readonly repository: IAlunoFamiliarRepository) {}

  static build(repository: IAlunoFamiliarRepository) {
    return new AlunoFamiliarServiceImplementation(repository);
  }

  public async create(
    alunoId: string,
    familiarId: string
  ): Promise<AlunoFamiliarCreateOutputDto> {
    const alunoFamiliar = AlunoFamiliar.create(alunoId, familiarId);

    await this.repository.save(alunoFamiliar);
    const output: AlunoFamiliarCreateOutputDto = {
      id: alunoFamiliar.id,
      alunoId: alunoFamiliar.alunoId,
      familiarId: alunoFamiliar.familiarId,
    };

    return output;
  }
  public async list(): Promise<AlunoFamiliarListOutputDto> {
    const data = await this.repository.list();
    const output: AlunoFamiliarListOutputDto = {
      alunosFamiliares: data,
    };
    return output;
  }

  public async update(
    id: string,
    alunoId: string,
    familiarId: string
  ): Promise<AlunoFamiliarOutputDto> {
    const alunoFamiliar = await this.repository.findById(id);
    if (!alunoFamiliar) {
      throw new HttpError("Aluno familiar não encontrado", 404);
    }
    const updatedAlunoFamiliar = AlunoFamiliar.with(id, alunoId, familiarId);
    await this.repository.update(updatedAlunoFamiliar);
    const output: AlunoFamiliarOutputDto = {
      id: updatedAlunoFamiliar.id,
      alunoId: updatedAlunoFamiliar.alunoId,
      familiarId: updatedAlunoFamiliar.familiarId,
    };
    return output;
  }

  public async deleteById(id: string): Promise<void> {
    const alunoFamiliar = await this.repository.findById(id);
    if (!alunoFamiliar) {
      throw new HttpError("Aluno familiar não encontrado", 404);
    }
    await this.repository.deleteById(id);
  }

  public async findById(id: string): Promise<AlunoFamiliarOutputDto | null> {
    const alunoFamiliar = await this.repository.findById(id);
    if (!alunoFamiliar) {
      return null;
    }
    const output: AlunoFamiliarOutputDto = {
      id: alunoFamiliar.id,
      alunoId: alunoFamiliar.alunoId,
      familiarId: alunoFamiliar.familiarId,
    };
    return output;
  }

  public async findByAlunoId(alunoId: string): Promise<AlunoFamiliarOutputDto[]> {
    const data = await this.repository.findByAlunoId(alunoId);
    const output: AlunoFamiliarOutputDto[] = data.map(
      (alunoFamiliar) =>
        ({
          id: alunoFamiliar.id,
          alunoId: alunoFamiliar.alunoId,
          familiarId: alunoFamiliar.familiarId,
        } as AlunoFamiliarOutputDto)
    );
    return output;
  }

  public async findByFamiliarId(familiarId: string): Promise<AlunoFamiliarOutputDto[]> {
    const data = await this.repository.findByFamiliarId(familiarId);
    const output: AlunoFamiliarOutputDto[] = data.map(
      (alunoFamiliar) =>
        ({
          id: alunoFamiliar.id,
          alunoId: alunoFamiliar.alunoId,
          familiarId: alunoFamiliar.familiarId,
        } as AlunoFamiliarOutputDto)
    );
    return output;
  }
}
