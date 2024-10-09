import { Endereco } from "../../../entities/endereco";
import { PrismaClient } from "@prisma/client";

export class EnderecoRepositoryPrisma {

  constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new EnderecoRepositoryPrisma(prisma);
  }

  public async save(endereco: Endereco): Promise<void> {
    const data = {
      id: endereco.id,
      cep: endereco.cep,
      logradouro: endereco.logradouro,
      logradouro_numero: endereco.logradouroNumero,
      complemento: endereco.complemento,
      bairro: endereco.bairro,
      cidade: endereco.cidade,
      uf: endereco.uf,
      alunoId: endereco.alunoId,
    }
    await this.prisma.endereco.create({ data });
  }

  public async findByAlunoId(alunoId: string): Promise<Endereco | null> {
    const data = await this.prisma.endereco.findFirst({ where: { alunoId } });
    if (!data) {
      return null;
    }
    return Endereco.with(
      data.id,
      data.cep,
      data.logradouro,
      data.logradouro_numero,
      data.bairro,
      data.cidade,
      data.uf,
      data.alunoId,
      data.complemento ?? ''
    );
  }

  public async findById(id: string): Promise<Endereco | null> {
    const data = await this.prisma.endereco.findUnique({ where: { id } });
    if (!data) {
      return null;
    }
    return Endereco.with(
      data.id,
      data.cep,
      data.logradouro,
      data.logradouro_numero,
      data.bairro,
      data.cidade,
      data.uf,
      data.alunoId,
      data.complemento ?? ''
    );
  }

  public async list(): Promise<Endereco[]> {
    const data = await this.prisma.endereco.findMany();
    if (!data) {
      return [];
    }
    return data.map((e) =>
      Endereco.with(
        e.id,
        e.cep,
        e.logradouro,
        e.logradouro_numero,
        e.bairro,
        e.cidade,
        e.uf,
        e.alunoId,
        e.complemento ?? ""
      )
    );
  }

  public async update(endereco: Endereco): Promise<void> {
    const data = {
      id: endereco.id,
      cep: endereco.cep,
      logradouro: endereco.logradouro,
      logradouro_numero: endereco.logradouroNumero,
      complemento: endereco.complemento,
      bairro: endereco.bairro,
      cidade: endereco.cidade,
      uf: endereco.uf,
      alunoId: endereco.alunoId,
    }
    await this.prisma.endereco.update({ where: { id: data.id }, data });
  }

  public async deleteById(id: string): Promise<void> {
    await this.prisma.endereco.delete({ where: { id } });
  }
  


}