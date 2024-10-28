import { PrismaClient } from "@prisma/client";
import { RegistroGeral } from "../../../entities/registroGeral";

export class RegistroGeralRepositoryPrisma {
  constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new RegistroGeralRepositoryPrisma(prisma);
  }

  public async save(registroGeral: RegistroGeral): Promise<void> {
    const data = {
      id: registroGeral.id,
      cpf: registroGeral.cpf,
      rg: registroGeral.rg,
      data_emissao_rg: registroGeral.dataEmissaoRg,
      renda_familiar: registroGeral.rendaFamiliar,
      bolsa_familia: registroGeral.bolsaFamilia,
      direito_imagem: registroGeral.direitoImagem,
      alunoId: registroGeral.alunoId,
      responsavelId: registroGeral.responsavelId,
    };
    await this.prisma.registroGeral.create({ data });
  }

  public async findById(id: string): Promise<RegistroGeral | null> {
    const data = await this.prisma.registroGeral.findUnique({
      where: { id },
    });
    if (!data) {
      return null;
    }
    return RegistroGeral.with(
      data.id,
      data.cpf,
      data.rg,
      data.data_emissao_rg,
      data.renda_familiar,
      data.bolsa_familia,
      data.direito_imagem,
      data.alunoId,
      data.responsavelId
    );
  }

  public async list(): Promise<RegistroGeral[]> {
    const data = await this.prisma.registroGeral.findMany();
    if (!data) {
      return [];
    }
    return data.map((rg) =>
      RegistroGeral.with(
        rg.id,
        rg.cpf,
        rg.rg,
        rg.data_emissao_rg,
        rg.renda_familiar,
        rg.bolsa_familia,
        rg.direito_imagem,
        rg.alunoId,
        rg.responsavelId
      )
    );
  }

  public async update(registroGeral: RegistroGeral): Promise<void> {
    const data = {
      cpf: registroGeral.cpf,
      rg: registroGeral.rg,
      data_emissao_rg: registroGeral.dataEmissaoRg,
      renda_familiar: registroGeral.rendaFamiliar,
      bolsa_familia: registroGeral.bolsaFamilia,
      direito_imagem: registroGeral.direitoImagem,
      alunoId: registroGeral.alunoId,
      responsavelId: registroGeral.responsavelId,
    };
    await this.prisma.registroGeral.update({
      where: { id: registroGeral.id },
      data,
    });
  }

  public async deleteById(id: string): Promise<void> {
    await this.prisma.registroGeral.delete({ where: { id } });
  }

  public async findByIdWithAlunoId (
    id: string
  ): Promise<RegistroGeral | null> {
    const data = await this.prisma.registroGeral.findUnique({
      where: { id },
      include: { aluno: true },
    });
    if (!data) {
      return null;
    }
    return RegistroGeral.with(
      data.id,
      data.cpf,
      data.rg,
      data.data_emissao_rg,
      data.renda_familiar,
      data.bolsa_familia,
      data.direito_imagem,
      data.alunoId,
      data.responsavelId
    );
  }
}
