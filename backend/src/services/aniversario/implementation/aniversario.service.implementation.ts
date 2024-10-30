import { Aniversario } from "../../../entities/aniversario";
import { IAniversarioRepository } from "../../../repositories/aniversario/aniversario.repository";
import { IAniversarioService, AniversarioCreateOutputDto, AniversarioListOutputDto, AniversarioOutputDto } from "../aniversario.service";
import { HttpError } from "../../../api/error/http.error";

export class AniversarioServiceImplementation implements IAniversarioService {
  constructor(readonly repository: IAniversarioRepository) {}

  public static build(repository: IAniversarioRepository) {
    return new AniversarioServiceImplementation(repository);
  }

  public async create(
    dataNascimento: Date,
    alunoId: string
  ): Promise<AniversarioCreateOutputDto> {
    const aniversario = Aniversario.create(dataNascimento, alunoId);
    await this.repository.save(aniversario);

    const output: AniversarioCreateOutputDto = {
      id: aniversario.id,
    };

    return output;
  }

  public async list(): Promise<AniversarioListOutputDto> {
    const aniversarios = await this.repository.list();
    const output: AniversarioListOutputDto = {
      proximos_aniversarios: aniversarios.map((a) => ({
        id: a.id,
        proximoAniversario: a.proximoAniversario,
        alunoId: a.alunoId,
      })),
    };

    return output;
  }

  public async findByAlunoId(
    alunoId: string
  ): Promise<AniversarioOutputDto | null> {
    const aniversario = await this.repository.findByAlunoId(alunoId);
    if (!aniversario) {
      return null;
    }

    const output: AniversarioOutputDto = {
      id: aniversario.id,
      dataNascimento: aniversario.dataNascimento,
      proximoAniversario: aniversario.proximoAniversario || undefined,
      alunoId: aniversario.alunoId,
    };

    return output;
  }

  public async findById(id: string): Promise<AniversarioOutputDto | null> {
    const aniversario = await this.repository.findById(id);
    if (!aniversario) {
      throw new HttpError("Aniversário não encontrado", 404);
    }

    const output: AniversarioOutputDto = {
      id: aniversario.id,
      dataNascimento: aniversario.dataNascimento,
      proximoAniversario: aniversario.proximoAniversario || undefined,
      alunoId: aniversario.alunoId,
    };

    return output;
  }

  public async update(
    id: string,
    dataNascimento: Date,
    alunoId: string
  ): Promise<AniversarioOutputDto> {
   const aniversario = await this.repository.findById(id);
    if (!aniversario) {
      throw new HttpError("Aniversário não encontrado", 404);
    }

    const newBirthday = Aniversario.with(
      id,
      dataNascimento,
      alunoId,
      aniversario.proximoAniversario
    );
    await this.repository.update(newBirthday);

    const output: AniversarioOutputDto = {
      id: newBirthday.id,
      dataNascimento: newBirthday.dataNascimento,
      proximoAniversario: newBirthday.proximoAniversario || undefined,
      alunoId: newBirthday.alunoId,
    };

    return output;
  }

  public async deleteById(id: string): Promise<void> {
    const aniversario = await this.repository.findById(id);
    if (!aniversario) {
      throw new HttpError("Aniversário não encontrado", 404);
    }
    await this.repository.deleteById(id);
  }
}
