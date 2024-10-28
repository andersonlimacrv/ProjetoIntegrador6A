import { Request, Response } from "express";
import { DadosMaeRepositoryPrisma } from "../../../repositories/dadosMae/prisma/dadosMae.repository.prisma";
import { prisma } from "../../../utils/prisma.util";
import { DadosMaeServiceImplementation } from "../../../services/dadosMae/implementation/dadosMae.service.implementation";
import { HttpError } from "../../error/http.error";
import { AlunoServiceImplementation } from "../../../services/aluno/implementation/aluno.service.implementation";
import { AlunoRepositoryPrisma } from "../../../repositories/aluno/prisma/aluno.repository.prisma";

/*  
model DadosMae {
  id                          String  @id @default(uuid())
  trabalha_fora               Boolean
  com_quem_deixar             String
  interesse_culinaria_costura Boolean
  qual_projeto                String?
  alunoId                     String
  aluno                       Aluno   @relation("DadosMaeAluno", fields: [alunoId], references: [id], onDelete: Cascade)

  @@map("dados_maes")
}
*/
export class DadosMaeController {
  private constructor() {}

  public static build() {
    return new DadosMaeController();
  }

  public async create(req: Request, res: Response) {
    try {
      const {
        trabalha_fora,
        com_quem_deixar,
        interesse_culinaria_costura,
        qual_projeto,
        alunoId,
      } = req.body;

      const aRepository = AlunoRepositoryPrisma.build(prisma);
      const aService = AlunoServiceImplementation.build(aRepository);

      const alunoExists = await aService.findById(alunoId);
      if (!alunoExists) {
        throw new HttpError("Aluno não encontrado", 404);
      }

      const dadosMaeRepository = DadosMaeRepositoryPrisma.build(prisma);
      const dadosMaeService =
        DadosMaeServiceImplementation.build(dadosMaeRepository);

      const output = await dadosMaeService.create(
        trabalha_fora,
        com_quem_deixar,
        interesse_culinaria_costura,
        alunoId,
        qual_projeto
      );

      const data = {
        id: output.id,
        trabalha_fora: output.trabalhaFora,
        com_quem_deixar: output.comQuemDeixar,
        interesse_culinaria_costura: output.interesseCulinariaCostura,
        qual_projeto: output.qualProjeto,
        alunoId: output.alunoId,
      };

      res.status(201).json(data);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Erro ao criar dados mãe" });
      }
    }
  }

  public async list(req: Request, res: Response) {
    try {
      const dadosMaeRepository = DadosMaeRepositoryPrisma.build(prisma);
      const dadosMaeService =
        DadosMaeServiceImplementation.build(dadosMaeRepository);

      const output = await dadosMaeService.list();

      const data = {
        dados_maes: output.dadosMaes,
      };

      res.status(200).json(data);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Erro ao listar dados maes" });
      }
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const {
        trabalha_fora,
        com_quem_deixar,
        interesse_culinaria_costura,
        qual_projeto,
        alunoId,
      } = req.body;

      const dadosMaeRepository = DadosMaeRepositoryPrisma.build(prisma);
      const dadosMaeService =
        DadosMaeServiceImplementation.build(dadosMaeRepository);

      const output = await dadosMaeService.update(
        id,
        trabalha_fora,
        com_quem_deixar,
        interesse_culinaria_costura,
        qual_projeto,
        alunoId
      );

      const data = {
        id: output.id,
        trabalha_fora: output.trabalhaFora,
        com_quem_deixar: output.comQuemDeixar,
        interesse_culinaria_costura: output.interesseCulinariaCostura,
        qual_projeto: output.qualProjeto,
        alunoId: output.alunoId,
      };

      res.status(200).json(data);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Erro ao atualizar dados maes" });
      }
    }
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;

    const dadosMaeRepository = DadosMaeRepositoryPrisma.build(prisma);
    const dadosMaeService =
      DadosMaeServiceImplementation.build(dadosMaeRepository);

    try {
      const dadosMaeExists = await dadosMaeService.findById(id);
      if (!dadosMaeExists) {
        throw new HttpError("Dados maes nao encontrado", 404);
      }
      await dadosMaeService.deleteById(id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Erro ao deletar dados maes" });
      }
    }
  }
}
