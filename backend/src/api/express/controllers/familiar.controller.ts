import { Request, Response } from "express";
import { FamiliarRepositoryPrisma } from "../../../repositories/familiar/prisma/familiar.repository.prisma";
import { prisma } from "../../../utils/prisma.util";
import { FamiliarServiceImplementation } from "../../../services/familiar/implementation/familiar.service.implementation";
import { HttpError } from "../../error/http.error";

export class FamiliarController {
  private constructor() {}

  public static build() {
    return new FamiliarController();
  }

  public async create(request: Request, response: Response) {
    try {
      const { nome, parentesco, telefone, autorizadoBuscar, responsavel } = request.body;

      const fRepository = FamiliarRepositoryPrisma.build(prisma);
      const fService = FamiliarServiceImplementation.build(fRepository);

      const output = await fService.create(
        nome,
        parentesco,
        telefone,
        autorizadoBuscar,
        responsavel
      );

      const data = {
        id: output.id,
        nome: output.nome,
        parentesco: output.parentesco,
        telefone: output.telefone,
        autorizado_buscar: output.autorizadoBuscar,
        responsavel: output.responsavel,
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
      const fRepository = FamiliarRepositoryPrisma.build(prisma);
      const fService = FamiliarServiceImplementation.build(fRepository);

      const output = await fService.list();

      const data = {
        familiares: output.familiares,
      };

      response.status(200).json(data);
    } catch (error) {
      if (error instanceof HttpError) {
        response.status(error.statusCode).json({ error: error.message });
      } else {
        response.status(500).json({ error: "Erro ao listar familiares" });
      }
    }
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params;
    const fRepository = FamiliarRepositoryPrisma.build(prisma);
    const fService = FamiliarServiceImplementation.build(fRepository);

    try { 
      const familiarExists = await fService.findById(id);
      if (!familiarExists) {
        throw new HttpError("Familiar nao encontrado", 404);
      }

      await fService.deleteById(id);
      response.status(204).send();
    } catch (error) {
      if (error instanceof HttpError) {
        response.status(error.statusCode).json({ error: error.message });
      } else {
        response.status(500).json({ error: "Erro ao deletar familiar" });
      }
    }
  }

  public async update(request: Request, response: Response) {
    const { id } = request.params;
    const { nome, parentesco, telefone, autorizadoBuscar, responsavel } = request.body;

    const fRepository = FamiliarRepositoryPrisma.build(prisma);
    const fService = FamiliarServiceImplementation.build(fRepository);

    try {
      const familiarExists = await fService.findById(id);
      if (!familiarExists) {
        throw new HttpError("Familiar nao encontrado", 404);
      }

      const output = await fService.update(
        id,
        nome,
        parentesco,
        telefone,
        autorizadoBuscar,
        responsavel
      );

      const data = {
        id: output.id,
        nome: output.nome,
        parentesco: output.parentesco,
        telefone: output.telefone,
        autorizado_buscar: output.autorizadoBuscar,
        responsavel: output.responsavel,
      };

      response.status(200).json(data);
    } catch (error) {
      if (error instanceof HttpError) {
        response.status(error.statusCode).json({ error: error.message });
      } else {
        response.status(500).json({ error: "Erro ao atualizar familiar" });
      }
    }
  }
  
}