import { AlunoRepository } from "../aluno.repository";
import { Aluno } from "../../../entities/aluno";
import { PrismaClient } from "@prisma/client";

export class AlunoRepositoryPrisma implements AlunoRepository {
  constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new AlunoRepositoryPrisma(prisma);
  }

  public async save(aluno: Aluno): Promise<void> {
    const data = {
      id: aluno.id,
      nome: aluno.nome,
      genero: aluno.genero,
      data_nascimento: aluno.dataNascimento,
      telefone: aluno.telefone,
      ano_escolar: aluno.anoEscolar,
      alfabetizado: aluno.alfabetizado,
      turno: aluno.turno,
      turma: aluno.turma,
    };
    await this.prisma.aluno.create({ data });
  }

  public async update(aluno: Aluno): Promise<void> {
    const data = {
      id: aluno.id,
      nome: aluno.nome,
      genero: aluno.genero,
      data_nascimento: aluno.dataNascimento,
      telefone: aluno.telefone,
      ano_escolar: aluno.anoEscolar,
      alfabetizado: aluno.alfabetizado,
      turno: aluno.turno,
      turma: aluno.turma,
    };
    await this.prisma.aluno.update({ where: { id: data.id }, data });
  }

  public async findById(id: string): Promise<Aluno | null> {
    const data = await this.prisma.aluno.findUnique({ where: { id } });
    if (!data) {
      return null;
    }
    return Aluno.with(
      data.id,
      data.nome,
      data.genero,
      data.data_nascimento,
      data.telefone,
      data.ano_escolar,
      data.alfabetizado,
      data.turno,
      data.turma
    );
  }

  public async list(): Promise<Aluno[]> {
    const data = await this.prisma.aluno.findMany();
    if (!data) {
      return [];
    }
    return data.map((a) =>
      Aluno.with(
        a.id,
        a.nome,
        a.genero,
        a.data_nascimento,
        a.telefone,
        a.ano_escolar,
        a.alfabetizado,
        a.turno,
        a.turma
      )
    );
  }

  public async deleteById(id: string): Promise<void> {
    await this.prisma.aluno.delete({ where: { id } });

  }
}
