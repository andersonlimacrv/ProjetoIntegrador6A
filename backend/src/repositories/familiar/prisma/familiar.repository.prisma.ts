import { PrismaClient } from "@prisma/client";
import { Familiar } from "../../../entities/familiar";

export class FamiliarRepositoryPrisma {
  constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new FamiliarRepositoryPrisma(prisma);
  }

  public async save(familiar: Familiar): Promise<void> {
    const data = {
      id: familiar.id,
      nome: familiar.nome,
      parentesco: familiar.parentesco,
      telefone: familiar.telefone,
      autorizado_buscar: familiar.autorizadoBuscar,
      responsavel: familiar.responsavel,
    };
    await this.prisma.familiar.create({ data });
  }

  public async findById(id: string): Promise<Familiar | null> {
    const data = await this.prisma.familiar.findUnique({ where: { id } });
    if (!data) {
      return null;
    }
    return Familiar.with(
      data.id,
      data.nome,
      data.parentesco,
      data.telefone,
      data.autorizado_buscar,
      data.responsavel
    );
  }

  public async list(): Promise<Familiar[]> {
    const data = await this.prisma.familiar.findMany();
    if (!data) {
      return [];
    }
    return data.map((f) =>
      Familiar.with(
        f.id,
        f.nome,
        f.parentesco,
        f.telefone,
        f.autorizado_buscar,
        f.responsavel
      )
    );
  }

  public async update(familiar: Familiar): Promise<void> {
    const data = {
      nome: familiar.nome,
      parentesco: familiar.parentesco,
      telefone: familiar.telefone,
      autorizado_buscar: familiar.autorizadoBuscar,
      responsavel: familiar.responsavel,
    };
    await this.prisma.familiar.update({ where: { id: familiar.id }, data });
  }

  public async deleteById(id: string): Promise<void> {
    await this.prisma.familiar.delete({ where: { id } });
  }
}
