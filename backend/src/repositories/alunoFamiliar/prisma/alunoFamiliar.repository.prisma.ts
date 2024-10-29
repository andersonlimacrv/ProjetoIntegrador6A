import { PrismaClient } from "@prisma/client";
import { AlunoFamiliar } from "../../../entities/alunoFamiliar";
import { IAlunoFamiliarRepository } from "../alunoFamiliar.repository";


export class AlunoFamiliarRepositoryPrisma implements IAlunoFamiliarRepository {
  constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new AlunoFamiliarRepositoryPrisma(prisma);
  }

  public async save(alunoFamiliar: AlunoFamiliar): Promise<void> {
    const data = { 
      id: alunoFamiliar.id,
      alunoId: alunoFamiliar.alunoId,
      familiarId: alunoFamiliar.familiarId
    };
    await this.prisma.alunoFamiliar.create({ data });
  }

  public async findById(id: string): Promise<AlunoFamiliar | null> {
    const data = await this.prisma.alunoFamiliar.findUnique({ where: { id } });
    if (!data) {
      return null;
    }
    return AlunoFamiliar.with(data.id, data.alunoId, data.familiarId);
  }

  public async findByAlunoId(alunoId: string): Promise<AlunoFamiliar[]> {
    const data = await this.prisma.alunoFamiliar.findMany({ where: { alunoId } });
    if (!data) {
      return [];
    }
    return data.map(d => AlunoFamiliar.with(d.id, d.alunoId, d.familiarId));
  }

  public async findByFamiliarId(familiarId: string): Promise<AlunoFamiliar[]> {
    const data = await this.prisma.alunoFamiliar.findMany({ where: { familiarId } });
    if (!data) {
      return [];
    }
    return data.map(d => AlunoFamiliar.with(d.id, d.alunoId, d.familiarId));
  }

  public async list(): Promise<AlunoFamiliar[]> {
    const data = await this.prisma.alunoFamiliar.findMany();
    return data.map(d => AlunoFamiliar.with(d.id, d.alunoId, d.familiarId));
  }

  public async deleteById(id: string): Promise<void> {
    await this.prisma.alunoFamiliar.delete({ where: { id } });
  }

  public async update(alunoFamiliar: AlunoFamiliar): Promise<void> {
    const data = { 
      id: alunoFamiliar.id,
      alunoId: alunoFamiliar.alunoId,
      familiarId: alunoFamiliar.familiarId
    };
    await this.prisma.alunoFamiliar.update({ where: { id: alunoFamiliar.id }, data });
  }
}
