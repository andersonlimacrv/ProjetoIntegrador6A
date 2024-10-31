import { Request, Response } from "express";
import { AniversarioRepositoryPrisma } from "../../../repositories/aniversario/prisma/aniversario.repository.prisma";
import { prisma } from "../../../utils/prisma.util";
import { AniversarioServiceImplementation } from "../../../services/aniversario/implementation/aniversario.service.implementation";
import { HttpError } from "../../error/http.error";
import { AlunoServiceImplementation } from "../../../services/aluno/implementation/aluno.service.implementation";
import { AlunoRepositoryPrisma } from "../../../repositories/aluno/prisma/aluno.repository.prisma";

export class AniversarioController {
  private constructor() {}

  public static build() {
    return new AniversarioController();
  }
  public async create(req: Request, res: Response) {
    try {
      const { alunoId, dataNascimento } = req.body;

      const aRepository = AlunoRepositoryPrisma.build(prisma);
      const aService = AlunoServiceImplementation.build(aRepository);

      const anivRepository = AniversarioRepositoryPrisma.build(prisma);
      const anivService =
        AniversarioServiceImplementation.build(anivRepository);

      const alunoExists = await aService.findById(alunoId);
      if (!alunoExists) {
        throw new HttpError("Aluno não encontrado", 404);
      }

      const output = await anivService.create(alunoId, dataNascimento);
      const data = {
        id: output.id,
      };
      res.status(201).json(data);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Erro ao criar aniversario" });
      }
    }
  }

  public async list(req: Request, res: Response) {
    try {
      const anivRepository = AniversarioRepositoryPrisma.build(prisma);
      const anivService =
        AniversarioServiceImplementation.build(anivRepository);
      const output = await anivService.list();
      const data = {
        aniversarios: output.proximos_aniversarios,
      };
      res.status(200).json(data);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Erro ao listar aniversarios" });
      }
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { alunoId, dataNascimento } = req.body;

      const anivRepository = AniversarioRepositoryPrisma.build(prisma);
      const anivService =
        AniversarioServiceImplementation.build(anivRepository);

      const output = await anivService.update(id, alunoId, dataNascimento);

      const data = {
        id: output.id,
        dataNascimento: output.dataNascimento,
        proximoAniversario: output.proximoAniversario,
        alunoId: output.alunoId,
      };
      res.status(200).json(data);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Erro ao atualizar aniversario" });
      }
    }
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;

    const anivRepository = AniversarioRepositoryPrisma.build(prisma);
    const anivService = AniversarioServiceImplementation.build(anivRepository);

    try {
      const aniversarioExists = await anivService.findById(id);
      if (!aniversarioExists) {
        throw new HttpError("Aniversário não encontrado", 404);
      }

      await anivService.deleteById(id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Erro ao deletar aniversario" });
      }
    }
  }
}
