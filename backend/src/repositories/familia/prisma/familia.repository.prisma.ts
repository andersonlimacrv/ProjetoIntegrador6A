import { PrismaClient } from "@prisma/client";
import { Familia } from "../../../entities/familia";
import { FamiliaRepository } from "../familia.repository";

export class FamiliaRepositoryPrisma implements FamiliaRepository {
  constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new FamiliaRepositoryPrisma(prisma);
  }

  public async save(familia: Familia): Promise<void> {
    const data = {
      id: familia.id,
      numero_filhos: familia.numeroFilhos,
      irmao_instituicao: familia.irmaoInstituicao,
      alunoId: familia.alunoId,
    };
    await this.prisma.familia.create({ data });
  }

  public async findByIdWithAlunoId(id: string): Promise<Familia | null> {
    const data = await this.prisma.familia.findUnique({
      where: { id },
      include: { aluno: true },
    });
    if (!data) {
      return null;
    }
    return Familia.with(
      data.id,
      data.numero_filhos,
      data.irmao_instituicao,
      data.alunoId
    );
  }
  public async findById(id: string): Promise<Familia | null> {
    const data = await this.prisma.familia.findUnique({ where: { id } });
    if (!data) {
      return null;
    }
    return Familia.with(
      data.id,
      data.numero_filhos,
      data.irmao_instituicao,
      data.alunoId
    );
  }

  public async list(): Promise<Familia[]> {
    const data = await this.prisma.familia.findMany();
    if (!data) {
      return [];
    }
    return data.map(
      (f) => Familia.with(f.id, f.numero_filhos, f.irmao_instituicao, f.alunoId)
    );
  }

  public async update(familia: Familia): Promise<void> {
    const data = {
      numero_filhos: familia.numeroFilhos,
      irmao_instituicao: familia.irmaoInstituicao,
      alunoId: familia.alunoId,
    };
    await this.prisma.familia.update({ where: { id: familia.id }, data });
  }

  public async deleteById(id: string): Promise<void> {
    await this.prisma.familia.delete({ where: { id } });
  }
}
