import { PrismaClient } from "@prisma/client";
import { DadosMae } from "../../../entities/dadosMae";

export class DadosMaeRepositoryPrisma {
  constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new DadosMaeRepositoryPrisma(prisma);
  }

  public async save(dadosMae: DadosMae): Promise<void> {
    const data = {
      id: dadosMae.id,
      trabalha_fora: dadosMae.trabalhaFora,
      com_quem_deixar: dadosMae.comQuemDeixar,
      interesse_culinaria_costura: dadosMae.interesseCulinariaCostura,
      qual_projeto: dadosMae.qualProjeto,
      alunoId: dadosMae.alunoId,
    };
    await this.prisma.dadosMae.create({ data });
  }

  public async findById(id: string): Promise<DadosMae | null> {
    const data = await this.prisma.dadosMae.findUnique({ where: { id } });
    if (!data) {
      return null;
    }
    return DadosMae.with(
      data.id,
      data.trabalha_fora,
      data.com_quem_deixar,
      data.interesse_culinaria_costura,
      data.qual_projeto || "",
      data.alunoId
    );
  }

  public async findByIdWithAlunoId(id: string): Promise<DadosMae | null> {
    const data = await this.prisma.dadosMae.findUnique({ where: { id } });
    if (!data) {
      return null;
    }
    return DadosMae.with(
      data.id,
      data.trabalha_fora,
      data.com_quem_deixar,
      data.interesse_culinaria_costura,
      data.qual_projeto || "",
      data.alunoId
    );
  }

  public async findByAlunoId(alunoId: string): Promise<DadosMae | null> {
    const data = await this.prisma.dadosMae.findFirst({ where: { alunoId } });
    if (!data) {
      return null;
    }
    return DadosMae.with(
      data.id,
      data.trabalha_fora,
      data.com_quem_deixar,
      data.interesse_culinaria_costura,
      data.qual_projeto || "",
      data.alunoId
    );
  }

  public async list(): Promise<DadosMae[]> {
    const data = await this.prisma.dadosMae.findMany();
    if (!data) {
      return [];
    }
    return data.map((d) =>
      DadosMae.with(
        d.id,
        d.trabalha_fora,
        d.com_quem_deixar,
        d.interesse_culinaria_costura,
        d.qual_projeto || "",
        d.alunoId
      )
    );
  }

  public async update(dadosMae: DadosMae): Promise<void> {
    const data = {
      trabalha_fora: dadosMae.trabalhaFora,
      com_quem_deixar: dadosMae.comQuemDeixar,
      interesse_culinaria_costura: dadosMae.interesseCulinariaCostura,
      qual_projeto: dadosMae.qualProjeto,
      alunoId: dadosMae.alunoId,
    };
    await this.prisma.dadosMae.update({ where: { id: dadosMae.id }, data });
  }

  public async deleteById(id: string): Promise<void> {
    await this.prisma.dadosMae.delete({ where: { id } });
  }
}
