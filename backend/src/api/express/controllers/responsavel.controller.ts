import { Request, Response } from "express";
import { ResponsavelRepositoryPrisma } from "../../../repositories/responsavel/prisma/responsavel.repository.prisma";
import { prisma } from "../../../utils/prisma.util";
import { ResponsavelServiceImplementation } from "../../../services/responsavel/implementation/responsavel.service.implementation";
import { HttpError } from "../../error/http.error";
import { FamiliarRepositoryPrisma } from "../../../repositories/familiar/prisma/familiar.repository.prisma";
import { FamiliarServiceImplementation } from "../../../services/familiar/implementation/familiar.service.implementation";

/* model Responsavel {
  id         String          @id @default(uuid())
  parentesco String
  familiarId String
  familiar   Familiar        @relation("ResponsavelFamiliar", fields: [familiarId], references: [id], onDelete: Cascade)
  registros  RegistroGeral[]

  @@map("responsaveis")
} */
export class ResponsavelController {
  private constructor() {}

  public static build() {
    return new ResponsavelController();
  }

  public async create(request: Request, response: Response) {
    try {
      const { parentesco, familiarId } = request.body;

      const fReposity = FamiliarRepositoryPrisma.build(prisma);
      const fService = FamiliarServiceImplementation.build(fReposity);

      const rRepository = ResponsavelRepositoryPrisma.build(prisma);
      const rService = ResponsavelServiceImplementation.build(rRepository);

      const familiarExists = await fService.findById(familiarId);
      if (!familiarExists) {
        throw new HttpError("Familiar nao encontrado", 404);
      }

      const output = await rService.create(parentesco, familiarId);

      const data = {
        id: output.id,
        parentesco: output.parentesco,
        familiarId: output.familiarId,
      };

      response.status(201).json(data);
    } catch (error) {
      if (error instanceof HttpError) {
        response.status(error.statusCode).json({ error: error.message });
      } else {
        response.status(500).json({ error: "Erro ao criar responsável" });
      }
    }
  }
  public async list(request: Request, response: Response) {
    try {
      const rRepository = ResponsavelRepositoryPrisma.build(prisma);
      const rService = ResponsavelServiceImplementation.build(rRepository);

      const output = await rService.list();
      const data = {
        responsaveis: output.responsaveis,
      };

      response.status(200).json(data);
    } catch (error) {
      if (error instanceof HttpError) {
        response.status(error.statusCode).json({ error: error.message });
      } else {
        response.status(500).json({ error: "Erro ao criar responsável" });
      }
    }
  }
  public async update(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { parentesco, familiarId } = request.body;

      const rRepository = ResponsavelRepositoryPrisma.build(prisma);
      const rService = ResponsavelServiceImplementation.build(rRepository);

      const familiarExists = await rService.findById(id);
      if (!familiarExists) {
        throw new HttpError("Responsável nao encontrado", 404);
      }

      const output = await rService.update(id, parentesco, familiarId);

      const data = {
        id: output.id,
        parentesco: output.parentesco,
        familiarId: output.familiarId,
      };

      response.status(200).json(data);
    } catch (error) {
      if (error instanceof HttpError) {
        response.status(error.statusCode).json({ error: error.message });
      } else {
        response.status(500).json({ error: "Erro ao criar responsável" });
      }
    }
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params;
    const rRepository = ResponsavelRepositoryPrisma.build(prisma);
    const rService = ResponsavelServiceImplementation.build(rRepository);

    try {
      const responsavelExists = await rService.findById(id);
      if (!responsavelExists) {
        throw new HttpError("Responsável nao encontrado", 404);
      }

      await rService.deleteById(id);
      response.status(204).send();
    } catch (error) {
      if (error instanceof HttpError) {
        response.status(error.statusCode).json({ error: error.message });
      } else {
        response.status(500).json({ error: "Erro ao deletar responsável" });
      }
    }
  }
  public async getById(request: Request, response: Response) {
    const { id } = request.params;
    const rRepository = ResponsavelRepositoryPrisma.build(prisma);
    const rService = ResponsavelServiceImplementation.build(rRepository);

    try {
      const output = await rService.findById(id);
      if (!output) {
        throw new HttpError("Responsável nao encontrado", 404);
      }
      const data = {
        id: output.id,
        parentesco: output.parentesco,
        familiarId: output.familiarId,
      };
      response.status(200).json(data);
    } catch (error) {
      if (error instanceof HttpError) {
        response.status(error.statusCode).json({ error: error.message });
      } else {
        response.status(500).json({ error: "Erro ao buscar responsável" });
      }
    }
  }
}
