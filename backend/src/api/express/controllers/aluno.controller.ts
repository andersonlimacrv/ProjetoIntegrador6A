import { Request, Response } from "express";
import { AlunoRepositoryPrisma } from "../../../repositories/aluno/prisma/aluno.repository.prisma";
import { prisma } from "../../../utils/prisma.util";
import { AlunoServiceImplementation } from "../../../services/aluno/implementation/aluno.service.implementation";
import { HttpError } from "../../error/http.error";

export class AlunoController {
  private constructor() {}

  public static build() {
    return new AlunoController();
  }

  public async create(request: Request, response: Response) {
    try {
      const {
        nome,
        genero,
        dataNascimento,
        telefone,
        anoEscolar,
        alfabetizado,
        turmaId,
        turno,
      } = request.body;

      const aRepository = AlunoRepositoryPrisma.build(prisma);
      const aService = AlunoServiceImplementation.build(aRepository);

      const output = await aService.create(
        nome,
        genero,
        dataNascimento,
        telefone,
        anoEscolar,
        alfabetizado,
        turmaId,
        turno
      );

      const data = {
        id: output.id,
        nome,
        genero,
        dataNascimento,
        telefone,
        anoEscolar,
        turmaId,
        turno,
      };

      response.status(201).json(data);
    } catch (error) {
      if (error instanceof HttpError) {
        response.status(error.statusCode).json({ error: error.message });
      } else {
        response.status(500).json({ error: "Erro ao criar aluno" });
      }
    }
  }

  public async list(request: Request, response: Response) {
    try {
      const aRepository = AlunoRepositoryPrisma.build(prisma);
      const aService = AlunoServiceImplementation.build(aRepository);

      const output = await aService.list();
      const data = {
        alunos: output.alunos,
      };

      response.status(200).json(data);
    } catch (error) {
      if (error instanceof HttpError) {
        response.status(error.statusCode).json({ error: error.message });
      } else {
        response.status(500).json({ error: "Erro ao listar alunos" });
      }
    }
  }

  public async update(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    try {
      const {
        nome,
        genero,
        dataNascimento,
        telefone,
        anoEscolar,
        alfabetizado,
        turmaId,
        turno,
      } = request.body;

      const aRepository = AlunoRepositoryPrisma.build(prisma);
      const aService = AlunoServiceImplementation.build(aRepository);

      const alunoExists = await aService.findById(id);
      if (!alunoExists) {
        throw new HttpError("Aluno não encontrado", 404);
      }

      const output = await aService.update(
        id,
        nome,
        genero,
        dataNascimento,
        telefone,
        anoEscolar,
        alfabetizado,
        turmaId,
        turno
      );

      response.status(200).json(output);
    } catch (error) {
      if (error instanceof HttpError) {
        response.status(error.statusCode).json({ error: error.message });
      } else {
        response.status(500).json({ error: "Erro ao atualizar aluno" });
      }
    }
  }

  public async delete(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    const aRepository = AlunoRepositoryPrisma.build(prisma);
    const aService = AlunoServiceImplementation.build(aRepository);

    try {
      const alunoExists = await aService.findById(id);
      if (!alunoExists) {
        throw new HttpError("Aluno não encontrado", 404);
      }

      await aService.deleteById(id);
      response.status(204).send();
    } catch (error) {
      if (error instanceof HttpError) {
        response.status(error.statusCode).json({ error: error.message });
      } else {
        response.status(500).json({ error: "Erro ao deletar aluno" });
      }
    }  
  }
}
