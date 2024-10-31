import { PrismaClient } from "@prisma/client";
import { DadosAdicionais } from "../../../entities/dadosAdicionais";
import { DadosAdicionaisRepository } from "../dadosAdicionais.repository";

export class DadosAdicionaisRepositoryPrisma implements DadosAdicionaisRepository {
  constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new DadosAdicionaisRepositoryPrisma(prisma);
  }

  public async save(dadosAdicionais: DadosAdicionais): Promise<void> {
    const data = {
      id: dadosAdicionais.id,
      cpf_nota_fiscal: dadosAdicionais.cpfNotaFiscal,
      tipo_residencia: dadosAdicionais.tipoResidencia,
      numero_comodos: dadosAdicionais.numeroComodos,
      possui_banheiro: dadosAdicionais.possuiBanheiro,
      possui_agua: dadosAdicionais.possuiAgua,
      possui_luz: dadosAdicionais.possuiLuz,
      alunoId: dadosAdicionais.alunoId,
    };

    await this.prisma.dadosAdicionais.create({ data });
  }

  public async update(dadosAdicionais: DadosAdicionais): Promise<void> {
    const data = {
      id: dadosAdicionais.id,
      cpf_nota_fiscal: dadosAdicionais.cpfNotaFiscal,
      tipo_residencia: dadosAdicionais.tipoResidencia,
      numero_comodos: dadosAdicionais.numeroComodos,
      possui_banheiro: dadosAdicionais.possuiBanheiro,
      possui_agua: dadosAdicionais.possuiAgua,
      possui_luz: dadosAdicionais.possuiLuz,
      alunoId: dadosAdicionais.alunoId,
    };

    await this.prisma.dadosAdicionais.update({ where: { id: dadosAdicionais.id }, data });
  }

  public async findyByAlunoId(alunoId: string): Promise<DadosAdicionais | null> {
    const data = await this.prisma.dadosAdicionais.findFirst({
      where: { alunoId },
    });

    if (!data) {
      return null;
    }
    return DadosAdicionais.with(
      data.id,
      data.cpf_nota_fiscal,
      data.tipo_residencia,
      data.numero_comodos,
      data.possui_banheiro,
      data.possui_agua,
      data.possui_luz,
      data.alunoId
    );
  }
    

  public async findById(id: string): Promise<DadosAdicionais | null> {
    const dadosAdicionais = await this.prisma.dadosAdicionais.findUnique({
      where: { id },
    });

    if (!dadosAdicionais) {
      return null;
    }

    return DadosAdicionais.with(
      dadosAdicionais.id,
      dadosAdicionais.cpf_nota_fiscal,
      dadosAdicionais.tipo_residencia,
      dadosAdicionais.numero_comodos,
      dadosAdicionais.possui_banheiro,
      dadosAdicionais.possui_agua,
      dadosAdicionais.possui_luz,
      dadosAdicionais.alunoId
    );
  }

  public async list(): Promise<DadosAdicionais[]> {
    const dadosAdicionais = await this.prisma.dadosAdicionais.findMany();

    if (!dadosAdicionais) {
      return [];
    }
    return dadosAdicionais.map((da) => {
      return DadosAdicionais.with(
        da.id,
        da.cpf_nota_fiscal,
        da.tipo_residencia,
        da.numero_comodos,
        da.possui_banheiro,
        da.possui_agua,
        da.possui_luz,
        da.alunoId
      );  
    });
  }

  public async deleteById(id: string): Promise<void> {
    await this.prisma.dadosAdicionais.delete({ where: { id } });
  }
}
