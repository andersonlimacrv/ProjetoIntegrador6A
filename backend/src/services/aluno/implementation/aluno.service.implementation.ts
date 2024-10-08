import {
  AlunoService,
  AlunoCreateOutputDto,
  AlunoListOutputDto,
  AlunoUpdateOutputDto,
  AlunoDetailOutputDto,
} from "../aluno.service";
import { AlunoRepository } from "../../../repositories/aluno/aluno.repository";
import { Aluno } from "../../../entities/aluno";

export class AlunoServiceImplementation implements AlunoService {
  private constructor(readonly repository: AlunoRepository) {}

  public static build(repository: AlunoRepository) {
    return new AlunoServiceImplementation(repository);
  }


  public async create(
    nome: string,
    genero: string,
    dataNascimento: Date,
    telefone: string,
    anoEscolar: string,
    alfabetizado: boolean,
    turma: string,
    turno: string
  ): Promise<AlunoCreateOutputDto> {
    const aluno = Aluno.create(
      nome,
      genero,
      dataNascimento,
      telefone,
      anoEscolar,
      alfabetizado,
      turno,
      turma
    );
    await this.repository.save(aluno);

    const output: AlunoCreateOutputDto = {
      id: aluno.id,
      nome: aluno.nome,
      genero: aluno.genero,
      dataNascimento: aluno.dataNascimento,
    };
    return output;
  }

  public async list(): Promise<AlunoListOutputDto> {
    const alunos = await this.repository.list();
    const output = {
      alunos: alunos.map((a) => ({
        id: a.id,
        nome: a.nome,
        genero: a.genero,
        dataNascimento: a.dataNascimento,
        telefone: a.telefone,
        anoEscolar: a.anoEscolar,
        alfabetizado: a.alfabetizado,
        turma: a.turma,
        turno: a.turno,
      })),
    };
    return output;
  }

  public async update(
    id: string,
    telefone: string
  ): Promise<AlunoUpdateOutputDto> {
    const aluno = await this.repository.findById(id);
    if (!aluno) {
      throw new Error("Aluno" + id + " não encontrado");
    }
    aluno.atualizarTelefone(telefone);
    await this.repository.update(aluno);

    const output: AlunoUpdateOutputDto = {
      id: aluno.id,
      nome: aluno.nome,
      telefone: aluno.telefone,
    };
    return output;
  }

  public async findById(id: string): Promise<AlunoDetailOutputDto> {
    const aluno = await this.repository.findById(id);
    if (!aluno) {
      throw new Error("Aluno" + id + " não encontrado");
    }
    const output: AlunoDetailOutputDto = {
      id: aluno.id,
      nome: aluno.nome,
      genero: aluno.genero,
      dataNascimento: aluno.dataNascimento,
      telefone: aluno.telefone,
      anoEscolar: aluno.anoEscolar,
      alfabetizado: aluno.alfabetizado,
      turma: aluno.turma,
      turno: aluno.turno,
    };
    return output;
  }
}
