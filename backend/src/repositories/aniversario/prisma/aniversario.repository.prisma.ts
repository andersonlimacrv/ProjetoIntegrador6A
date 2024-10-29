import { Aniversario } from "../../../entities/aniversario";
import { PrismaClient } from "@prisma/client";
import { IAniversarioRepository } from "../aniversario.repository";

export class AniversarioRepositoryPrisma implements IAniversarioRepository {


  /* model Aniversario {
  id                String   @id @default(uuid())
  data_nascimento   DateTime
  proximo_aniversario DateTime?
  alunoId           String
  aluno             Aluno    @relation("AniversariosAluno", fields: [alunoId], references: [id], onDelete: Cascade)

  @@map("aniversarios")
}
 */
  constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new AniversarioRepositoryPrisma(prisma);
  }

  public async save(aniversario: Aniversario): Promise<void> {
    const data = { 
      id: aniversario.id,
      data_nascimento: aniversario.dataNascimento,
      proximo_aniversario: aniversario.proximoAniversario,
      alunoId: aniversario.alunoId
    };
    await this.prisma.aniversario.create({ data });
    }

  public async findById(id: string): Promise<Aniversario | null> {
    const data = await this.prisma.aniversario.findUnique({ where: { id } });
    if (!data) {
      return null;
    }
    return Aniversario.with(
      data.id,
      data.data_nascimento,
      data.alunoId,
      data.proximo_aniversario || undefined
    );
  }

  public async findByAlunoId(alunoId: string): Promise<Aniversario | null> {
    const data = await this.prisma.aniversario.findFirst({ where: { alunoId } });
    if (!data) {
      return null;
    }
    return Aniversario.with(
      data.id,
      data.data_nascimento,
      data.alunoId,
      data.proximo_aniversario || undefined
    );
  }

  public async list(): Promise<Aniversario[]> {
    const data = await this.prisma.aniversario.findMany();
    if (!data) {
      return [];
    }
    return data.map((aniversario) =>
      Aniversario.with(
        aniversario.id,
        aniversario.data_nascimento,
        aniversario.alunoId,
        aniversario.proximo_aniversario || undefined
      )
    );
  }

  public async update(aniversario: Aniversario): Promise<void> {
    const data = { 
      id: aniversario.id,
      data_nascimento: aniversario.dataNascimento,
      proximo_aniversario: aniversario.proximoAniversario,
      alunoId: aniversario.alunoId
    };
    await this.prisma.aniversario.update({ where: { id: aniversario.id }, data });
  }

  public async deleteById(id: string): Promise<void> {
    await this.prisma.aniversario.delete({ where: { id } });
  }


}