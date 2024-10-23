import { PrismaClient } from "@prisma/client";
import { Responsavel } from "../../../entities/responsavel";

export class FamiliarRepositoryPrisma {
  constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new FamiliarRepositoryPrisma(prisma);
  }

  public async save(responsavel: Responsavel): Promise<void> {
    const data = {
      parentesco: responsavel.parentesco,
      familiarId: responsavel.familiarId,
    };

    await this.prisma.responsavel.create({ data });
  }

  public async findById(id: string): Promise<Responsavel | null> {
    const data = await this.prisma.responsavel.findUnique({ where: { id } });
    if (!data) {
      return null;
    }
    return Responsavel.with(
      data.id,
      data.parentesco,
      data.familiarId
    );
  }

  public async list(): Promise<Responsavel[]> {
    const data = await this.prisma.responsavel.findMany();
    if (!data) {
      return [];
    }
    return data.map((f) =>
      Responsavel.with(
        f.id,
        f.parentesco,
        f.familiarId
      )
    );
  }

  public async deleteById(id: string): Promise<void> {
    await this.prisma.responsavel.delete({ where: { id } });
  }

  public async update(responsavel: Responsavel): Promise<void> {
    const data = {
      parentesco: responsavel.parentesco,
      familiarId: responsavel.familiarId,
    };
    await this.prisma.responsavel.update({ where: { id: responsavel.id }, data });
  }

  public async findByFamiliarId(familiarId: string): Promise<Responsavel | null> {
    const data = await this.prisma.responsavel.findFirst({ where: { familiarId } });
    if (!data) {
      return null;
    }
    return Responsavel.with(
      data.id,
      data.parentesco,
      data.familiarId
    );
  }
 
}
