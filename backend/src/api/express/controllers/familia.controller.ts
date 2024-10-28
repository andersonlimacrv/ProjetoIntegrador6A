import { Request, Response } from "express";
import { prisma } from "../../../utils/prisma.util"; 
import { FamiliaRepositoryPrisma } from "../../../repositories/familia/prisma/familia.repository.prisma";
import { HttpError } from "../../error/http.error";
import { FamiliaServiceImplementation } from "../../../services/familia/implementation/familia.service.implementation";
import { AlunoRepositoryPrisma } from "../../../repositories/aluno/prisma/aluno.repository.prisma";
import { AlunoServiceImplementation } from "../../../services/aluno/implementation/aluno.service.implementation";

export class FamiliaController {
  private constructor() {}

  public static build() {
    return new FamiliaController();
  }

  public async create(request: Request, response: Response) {
    try {
      const { numero_filhos, irmao_instituicao, alunoId } = request.body;

      const fRepository = FamiliaRepositoryPrisma.build(prisma);
      const fService = FamiliaServiceImplementation.build(fRepository);

      const aRepository = AlunoRepositoryPrisma.build(prisma);
      const aService = AlunoServiceImplementation.build(aRepository);

      const alunoExists = await aService.findById(alunoId);
      if (!alunoExists) {
        throw new HttpError("Aluno não encontrado", 404);
      }

      const output = await fService.create(
        numero_filhos,
        irmao_instituicao,
        alunoId
      );

      const data = {
        id: output.id,
        numero_filhos,
        irmao_instituicao,
        alunoId,
      };

      response.status(201).json(data);
    } catch (error) {
      if (error instanceof HttpError) {
        response.status(error.statusCode).json({ error: error.message });
      } else {
        response.status(500).json({ error: "Erro ao criar familia" });
      }
    }
  }

  public async list(request: Request, response: Response) {
    try {
      const fRepository = FamiliaRepositoryPrisma.build(prisma);
      const fService = FamiliaServiceImplementation.build(fRepository);

      const output = await fService.list();

      const data = {
        familias: output.familias,
      };

      response.status(200).json(data);
    } catch (error) {
      if (error instanceof HttpError) {
        response.status(error.statusCode).json({ error: error.message });
      } else {
        response.status(500).json({ error: "Erro ao listar familias" });
      }
    }
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params;
    const fRepository = FamiliaRepositoryPrisma.build(prisma);
    const fService = FamiliaServiceImplementation.build(fRepository);

    try {
      const familiaExists = await fService.findById(id);
      if (!familiaExists) {
        throw new HttpError("Familia nao encontrada", 404);
      }

      await fService.deleteById(id);
      response.status(204).send();
    } catch (error) {
      if (error instanceof HttpError) {
        response.status(error.statusCode).json({ error: error.message });
      } else {
        response.status(500).json({ error: "Erro ao deletar familia" });
      }
    }
  }

  public async update(request: Request, response: Response) {
    const { id } = request.params;
    const { numero_filhos, irmao_instituicao, alunoId } = request.body;

    const fRepository = FamiliaRepositoryPrisma.build(prisma);
    const fService = FamiliaServiceImplementation.build(fRepository);

    try {
      const familiaExists = await fService.findById(id);
      if (!familiaExists) {
        throw new HttpError("Familia nao encontrada", 404);
      }

      const output = await fService.update(
        id,
        numero_filhos,
        irmao_instituicao,
        alunoId
      );

      const data = {
        id: output.id,
        numero_filhos,
        irmao_instituicao,
        alunoId,
      };

      response.status(200).json(data);
    } catch (error) {
      if (error instanceof HttpError) {
        response.status(error.statusCode).json({ error: error.message });
      } else {
        response.status(500).json({ error: "Erro ao atualizar familia" });
      }
    }
  }
}