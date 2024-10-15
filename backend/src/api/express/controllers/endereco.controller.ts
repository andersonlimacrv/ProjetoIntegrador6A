import { Request, Response } from "express";
import { EnderecoRepositoryPrisma } from "../../../repositories/endereco/prisma/endereco.repository.prisma";
import { prisma } from "../../../utils/prisma.util";
import { EnderecoServiceImplementation } from "../../../services/endereco/implementation/endereco.service.implementation";
import { AlunoServiceImplementation } from "../../../services/aluno/implementation/aluno.service.implementation";
import { HttpError } from "../../error/http.error";
import { AlunoRepositoryPrisma } from "../../../repositories/aluno/prisma/aluno.repository.prisma";

export class EnderecoController {
  private constructor() {}

  public static build() {
    return new EnderecoController();
  }

  public async create(request: Request, response: Response) {
    try {
      const {
        cep,
        logradouro,
        logradouroNumero,
        bairro,
        cidade,
        uf,
        alunoId,
        complemento,
      } = request.body;

      const eRepository = EnderecoRepositoryPrisma.build(prisma);
      const eService = EnderecoServiceImplementation.build(eRepository);

      const aRepository = AlunoRepositoryPrisma.build(prisma);
      const aService = AlunoServiceImplementation.build(aRepository);

      const alunoExists = await aService.findById(alunoId);
      if (!alunoExists) {
        throw new HttpError("Aluno não encontrado", 404);
      }

      const output = await eService.create(
        cep,
        logradouro,
        logradouroNumero,
        bairro,
        cidade,
        uf,
        alunoId,
        complemento,
      );

      const data = {
        id: output.id,
        cep: output.cep,
        logradouro: output.logradouro,
        logradouroNumero: output.logradouroNumero,
        bairro: output.bairro,
        cidade: output.cidade,
        uf: output.uf,
        alunoId: output.alunoId,
        complemento: output.complemento,
      };

      response.status(201).json(data);
    } catch (error) {
      if (error instanceof HttpError) {
        response.status(error.statusCode).json({ error: error.message });
      } else {
        response.status(500).json({ error: "Erro ao criar endereço" });
      }
    }
  }

  public async list(request: Request, response: Response) {
    try {
      const eRepository = EnderecoRepositoryPrisma.build(prisma);
      const eService = EnderecoServiceImplementation.build(eRepository);

      const output = await eService.list();

      const data = {
        enderecos: output.enderecos,
      };

      response.status(200).json(data);
    } catch (error) {
      if (error instanceof HttpError) {
        response.status(error.statusCode).json({ error: error.message });
      } else {
        response.status(500).json({ error: "Erro ao listar endereços" });
      }
    }
  }

  public async update(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const {
        cep,
        logradouro,
        logradouroNumero,
        bairro,
        cidade,
        uf,
        alunoId,
        complemento,
      } = request.body;

      const eRepository = EnderecoRepositoryPrisma.build(prisma);
      const eService = EnderecoServiceImplementation.build(eRepository);

      const output = await eService.update(
        id,
        cep,
        logradouro,
        logradouroNumero,
        bairro,
        cidade,
        uf,
        alunoId,
        complemento,
      );

      const data = {
        id: output.id,
        cep: output.cep,
        logradouro: output.logradouro,
        logradouroNumero: output.logradouroNumero,
        bairro: output.bairro,
        cidade: output.cidade,
        uf: output.uf,
        alunoId: output.alunoId,
        complemento: output.complemento,
      };

      response.status(200).json(data);
    } catch (error) {
      if (error instanceof HttpError) {
        response.status(error.statusCode).json({ error: error.message });
      } else {
        response.status(500).json({ error: "Erro ao atualizar endereço" });
      }
    }
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params;
    const eRepository = EnderecoRepositoryPrisma.build(prisma);
    const eService = EnderecoServiceImplementation.build(eRepository);

    try {
      const endExists = await eService.findById(id);
      if (!endExists) {
        throw new HttpError("Endereço não encontrado", 404);
      }

      await eService.deleteById(id);
      response.status(204).send();
    } catch (error) {
      if (error instanceof HttpError) {
        response.status(error.statusCode).json({ error: error.message });
      } else {
        response.status(500).json({ error: "Erro ao deletar endereço" });
      }
    }
  }
}
