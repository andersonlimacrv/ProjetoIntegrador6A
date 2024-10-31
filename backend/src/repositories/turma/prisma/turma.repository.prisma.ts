import { Turma } from "../../../entities/turma";
import { PrismaClient } from "@prisma/client";
import { TurmaRepository } from "../turma.repository";

export class TurmaRepositoryPrisma implements TurmaRepository {
  constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new TurmaRepositoryPrisma(prisma);
  }

  public async save(turma: Turma): Promise<void> {
    const data = {
      id: turma.id,
      nome_turma: turma.nomeTurma,
      idade: turma.idade,
      turno: turma.turno,
      escola: turma.escola,
      renda_mensal: turma.rendaMensal,
    };
    await this.prisma.turma.create({ data });
  }

  public async findById(id: string): Promise<Turma | null> {
    const data = await this.prisma.turma.findUnique({ where: { id } });
    if (!data) {
      return null;
    }
    return Turma.with(
      data.id,
      data.nome_turma,
      data.idade,
      data.turno,
      data.escola,
      data.renda_mensal
    );
  }

  public async list(): Promise<Turma[]> {
    const data = await this.prisma.turma.findMany();
    if (!data) {
      return [];
    }
    return data.map((t) =>
      Turma.with(t.id, t.nome_turma, t.idade, t.turno, t.escola, t.renda_mensal)
    );
  }

  public async update(turma: Turma): Promise<void> {
    const data = {
      id: turma.id,
      nome_turma: turma.nomeTurma,
      idade: turma.idade,
      turno: turma.turno,
      escola: turma.escola,
      renda_mensal: turma.rendaMensal,
    };
    await this.prisma.turma.update({ where: { id: data.id }, data });
  }

  public async deleteById(id: string): Promise<void> {
    await this.prisma.turma.delete({ where: { id } });
  }
}
