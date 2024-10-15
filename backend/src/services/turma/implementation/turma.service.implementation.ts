import {
  TurmaService,
  TurmaCreateOutputDto,
  TurmaUpdateOutputDto,
  TurmaListOutputDto,
} from "../turma.service";
import { TurmaRepository } from "../../../repositories/turma/turma.repository";
import { Turma } from "../../../entities/turma";
import { HttpError } from "../../../api/error/http.error";

export class TurmaServiceImplementation implements TurmaService {
  private constructor(readonly repository: TurmaRepository) {}

  public static build(repository: TurmaRepository) {
    return new TurmaServiceImplementation(repository);
  }

  public async create(
    nomeTurma: string,
    idade: number,
    turno: string,
    escola: string,
    rendaMensal: number
  ): Promise<TurmaCreateOutputDto> {
    const turma = Turma.create(nomeTurma, idade, turno, escola, rendaMensal);

    await this.repository.save(turma);

    return {
      id: turma.id,
      nomeTurma: turma.nomeTurma,
      idade: turma.idade,
      turno: turma.turno,
      escola: turma.escola,
      rendaMensal: turma.rendaMensal,
    };
  }

  public async list(): Promise<TurmaListOutputDto> {
    const turmas = await this.repository.list();
    return {
      turmas: turmas.map((t) => ({
        id: t.id,
        nomeTurma: t.nomeTurma,
        idade: t.idade,
        turno: t.turno,
        escola: t.escola,
        rendaMensal: t.rendaMensal,
      })),
    };
  }

  public async update(
    id: string,
    nomeTurma: string,
    idade: number,
    turno: string,
    escola: string,
    rendaMensal: number
  ): Promise<TurmaUpdateOutputDto> {
    const turma = await this.repository.findById(id);
    if (!turma) {
      throw new HttpError("Turma não encontrada", 404);
    }
    const updatedTurma = Turma.with(
      id,
      nomeTurma,
      idade,
      turno,
      escola,
      rendaMensal
    );

    await this.repository.update(updatedTurma);
    const output: TurmaUpdateOutputDto = {
      id: updatedTurma.id,
      nomeTurma: updatedTurma.nomeTurma,
      idade: updatedTurma.idade,
      turno: updatedTurma.turno,
      escola: updatedTurma.escola,
      rendaMensal: updatedTurma.rendaMensal,
    };

    return output;
  }

  public async findById(id: string): Promise<TurmaUpdateOutputDto> {
    const turma = await this.repository.findById(id);
    if (!turma) {
      throw new HttpError("Turma não encontrada", 404);
    }
    return {
      id: turma.id,
      nomeTurma: turma.nomeTurma,
      idade: turma.idade,
      turno: turma.turno,
      escola: turma.escola,
      rendaMensal: turma.rendaMensal,
    };
  }

  public async deleteById(id: string): Promise<void> {
    const turma = await this.repository.findById(id);
    if (!turma) {
      throw new HttpError("Turma não encontrada", 404);
    }
    await this.repository.deleteById(id);
  }
}
