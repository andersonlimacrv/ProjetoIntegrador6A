import { Request, Response } from "express";
import { TurmaRepositoryPrisma } from "../../../repositories/turma/prisma/turma.repository.prisma";
import { prisma } from "../../../utils/prisma.util";
import { TurmaServiceImplementation } from "../../../services/turma/implementation/turma.service.implementation";
import { HttpError } from "../../error/http.error";

export class TurmaController {
  private constructor() {}

  public static build() {
    return new TurmaController();
  }

  public async create(request: Request, response: Response) {
    try {
      const { nomeTurma, idade, turno, escola, rendaMensal } = request.body;

      const tRepository = TurmaRepositoryPrisma.build(prisma);
      const tService = TurmaServiceImplementation.build(tRepository);

      const output = await tService.create(
        nomeTurma,
        idade,
        turno,
        escola,
        rendaMensal
      );

      const data = {
        id: output.id,
        nomeTurma: output.nomeTurma,
        idade: output.idade,
        turno: output.turno,
        escola: output.escola,
        rendaMensal: output.rendaMensal,
      };

      response.status(201).json(data);
    } catch (error) {
      if (error instanceof HttpError) {
        response.status(error.statusCode).json({ error: error.message });
      } else {
        response.status(500).json({ error: "Erro ao criar turma" });
      }
    }
  }

  public async list(request: Request, response: Response) {
    try {
      const tRepository = TurmaRepositoryPrisma.build(prisma);
      const tService = TurmaServiceImplementation.build(tRepository);

      const output = await tService.list();

      const data = {
        turmas: output.turmas,
      };

      response.status(200).json(data);
    } catch (error) {
      if (error instanceof HttpError) {
        response.status(error.statusCode).json({ error: error.message });
      } else {
        response.status(500).json({ error: "Erro ao listar turmas" });
      }
    }
  }

  public async update(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { nomeTurma, idade, turno, escola, rendaMensal } = request.body;

      const tRepository = TurmaRepositoryPrisma.build(prisma);
      const tService = TurmaServiceImplementation.build(tRepository);

      const output = await tService.update(
        id,
        nomeTurma,
        idade,
        turno,
        escola,
        rendaMensal
      );
      const data = {
        id: output.id,
        nomeTurma: output.nomeTurma,
        idade: output.idade,
        turno: output.turno,
        escola: output.escola,
        rendaMensal: output.rendaMensal,
      };

      response.status(200).json(data);
    } catch (error) {
      if (error instanceof HttpError) {
        response.status(error.statusCode).json({ error: error.message });
      } else {
        response.status(500).json({ error: "Erro ao atualizar turma" });
      }
    }
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params;

    const tRepository = TurmaRepositoryPrisma.build(prisma);
    const tService = TurmaServiceImplementation.build(tRepository);

    try {
      const turmaExists = await tService.findById(id);
      if (!turmaExists) {
        throw new HttpError("Turma não encontrada", 404);
      }

      await tService.deleteById(id);
      response.status(204).send();
    } catch (error) {
      if (error instanceof HttpError) {
        response.status(error.statusCode).json({ error: error.message });
      } else {
        response.status(500).json({ error: "Erro ao deletar turma" });
      }
    }
  }
}