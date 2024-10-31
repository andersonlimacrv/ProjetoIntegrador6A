import { Request, Response } from "express";
import { AlunoFamiliarServiceImplementation } from "../../../services/alunoFamiliar/implementation/alunoFamiliar.service.implementation";
import { AlunoFamiliarRepositoryPrisma } from "../../../repositories/alunoFamiliar/prisma/alunoFamiliar.repository.prisma";
import { prisma } from "../../../utils/prisma.util";
import { HttpError } from "../../error/http.error";
import { AlunoServiceImplementation } from "../../../services/aluno/implementation/aluno.service.implementation";
import { AlunoRepositoryPrisma } from "../../../repositories/aluno/prisma/aluno.repository.prisma";

export class AlunoFamiliarController {
  private constructor() {}

  public static build() {
    return new AlunoFamiliarController();
  }

  public async create(request: Request, response: Response) {
    try {
      const { alunoId, familiarId } = request.body;

      const alunoRepositoryPrisma = AlunoRepositoryPrisma.build(prisma);
      const alunoServiceImplementation = AlunoServiceImplementation.build(
        alunoRepositoryPrisma
      );

      const alunoExists = await alunoServiceImplementation.findById(alunoId);
      if (!alunoExists) {
        throw new HttpError("Aluno não encontrado", 404);
      }

      const alunoFamiliarRepositoryPrisma =
        AlunoFamiliarRepositoryPrisma.build(prisma);
      const alunoFamiliarServiceImplementation =
        AlunoFamiliarServiceImplementation.build(alunoFamiliarRepositoryPrisma);

      const output = await alunoFamiliarServiceImplementation.create(
        alunoId,
        familiarId
      );
      const data = {
        id: output.id,
        alunoId: output.alunoId,
        familiarId: output.familiarId,
      };
      response.status(201).json(data);
    } catch (error) {
      if (error instanceof HttpError) {
        response.status(error.statusCode).json({ error: error.message });
      } else {
        response.status(500).json({ error: "Erro ao criar familiar" });
      }
    }
  }
  public async list(request: Request, response: Response) {
    try {
      const alunoFamiliarRepositoryPrisma =
        AlunoFamiliarRepositoryPrisma.build(prisma);
      const alunoFamiliarServiceImplementation =
        AlunoFamiliarServiceImplementation.build(alunoFamiliarRepositoryPrisma);

      const output = await alunoFamiliarServiceImplementation.list();
      const data = {
        alunosFamiliares: output.alunosFamiliares,
      };
      response.status(200).json(data);
    } catch (error) {
      if (error instanceof HttpError) {
        response.status(error.statusCode).json({ error: error.message });
      } else {
        response.status(500).json({ error: "Erro ao criar familiar" });
      }
    }
  }

  public async update(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { alunoId, familiarId } = request.body;

      const alunoFamiliarRepositoryPrisma =
        AlunoFamiliarRepositoryPrisma.build(prisma);
      const alunoFamiliarServiceImplementation =
        AlunoFamiliarServiceImplementation.build(alunoFamiliarRepositoryPrisma);

      const output = await alunoFamiliarServiceImplementation.update(
        id,
        alunoId,
        familiarId
      );
      const data = {
        id: output.id,
        alunoId: output.alunoId,
        familiarId: output.familiarId,
      };
      response.status(200).json(data);
    } catch (error) {
      if (error instanceof HttpError) {
        response.status(error.statusCode).json({ error: error.message });
      } else {
        response.status(500).json({ error: "Erro ao criar familiar" });
      }
    }
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params;
    const aRepository = AlunoFamiliarRepositoryPrisma.build(prisma);
    const aService = AlunoFamiliarServiceImplementation.build(aRepository);

    try {
      const alunoFamiliarExists = await aService.findById(id);
      if (!alunoFamiliarExists) {
        throw new HttpError("Aluno familiar não encontrado", 404);
      }

      await aService.deleteById(id);
      response.status(204).send();
    } catch (error) {
      if (error instanceof HttpError) {
        response.status(error.statusCode).json({ error: error.message });
      } else {
        response.status(500).json({ error: "Erro ao deletar familiar" });
      }
    }
  }
  public async getById(request: Request, response: Response) {
    const { id } = request.params;
    const aRepository = AlunoFamiliarRepositoryPrisma.build(prisma);
    const aService = AlunoFamiliarServiceImplementation.build(aRepository);

    try {
      const output = await aService.findById(id);
      if (!output) {
        throw new HttpError("Aluno familiar não encontrado", 404);
      }
      const data = {
        id: output.id,
        alunoId: output.alunoId,
        familiarId: output.familiarId,
      };
      response.status(200).json(data);
    } catch (error) {
      if (error instanceof HttpError) {
        response.status(error.statusCode).json({ error: error.message });
      } else {
        response.status(500).json({ error: "Erro ao buscar familiar" });
      }
    }
  }
  public async getByAlunoId(request: Request, response: Response) {
    const { id } = request.params;
    const aRepository = AlunoFamiliarRepositoryPrisma.build(prisma);
    const aService = AlunoFamiliarServiceImplementation.build(aRepository);

    try {
      const output = await aService.findByAlunoId(id);
      if (!output) {
        throw new HttpError("Aluno familiar não encontrado", 404);
      }
      const data = output.map(
        (alunoFamiliar) => ({
          id: alunoFamiliar.id,
          alunoId: alunoFamiliar.alunoId,
          familiarId: alunoFamiliar.familiarId,
        })
      );
      response.status(200).json(data);
    } catch (error) {
      if (error instanceof HttpError) {
        response.status(error.statusCode).json({ error: error.message });
      } else {
        response.status(500).json({ error: "Erro ao buscar familiar" });
      }
    }
  }

  public async getByFamiliarId(request: Request, response: Response) {
    const { id } = request.params;
    const aRepository = AlunoFamiliarRepositoryPrisma.build(prisma);
    const aService = AlunoFamiliarServiceImplementation.build(aRepository);

    try {
      const output = await aService.findByFamiliarId(id);
      if (!output) {
        throw new HttpError("Aluno familiar não encontrado", 404);
      }
      const data = output.map(
        (alunoFamiliar) => ({
          id: alunoFamiliar.id,
          alunoId: alunoFamiliar.alunoId,
          familiarId: alunoFamiliar.familiarId,
        })
      );
      response.status(200).json(data);
    } catch (error) {
      if (error instanceof HttpError) {
        response.status(error.statusCode).json({ error: error.message });
      } else {
        response.status(500).json({ error: "Erro ao buscar familiar" });
      }
    }
  }

}


