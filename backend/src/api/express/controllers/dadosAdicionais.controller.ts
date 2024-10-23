import { Request, Response } from "express";
import { DadosAdicionaisRepositoryPrisma } from "../../../repositories/dadosAdicionais/prisma/dadosAdicionais.repository.prisma";
import { DadosAdicionaisServiceImplementation } from "../../../services/dadosAdicionais/implementation/dadosAdicionais.service.implementation";
import { HttpError } from "../../error/http.error";
import { prisma } from "../../../utils/prisma.util";

export class DadosAdicionaisController {
  private constructor() {}

  public static build() {
    return new DadosAdicionaisController();
  }

  public async create(request: Request, response: Response) {
    try {
      const {
        cpf_nota_fiscal,
        tipo_residencia,
        numero_comodos,
        possui_banheiro,
        possui_agua,
        possui_luz,
        alunoId,
      } = request.body;

      const aRepository = DadosAdicionaisRepositoryPrisma.build(prisma);
      const aService = DadosAdicionaisServiceImplementation.build(aRepository);

      const output = await aService.create(
        cpf_nota_fiscal,
        tipo_residencia,
        numero_comodos,
        possui_banheiro,
        possui_agua,
        possui_luz,
        alunoId
      );

      const data = {
        id: output.id,
        cpf_nota_fiscal,
        tipo_residencia,
        numero_comodos,
        possui_banheiro,
        possui_agua,
        possui_luz,
        alunoId,
      };
      response.status(201).json(data);
    } catch (error) {
      if (error instanceof HttpError) {
        response.status(error.statusCode).json({ error: error.message });
      } else {
        response.status(500).json({ error: "Erro ao criar dados adicionais" });
      }
    }
  }

  public async list(request: Request, response: Response) {
    try {
      const aRepository = DadosAdicionaisRepositoryPrisma.build(prisma);
      const aService = DadosAdicionaisServiceImplementation.build(aRepository);

      const output = await aService.list();

      const data = {
        dados_adicionais: output.dadosAdicionais,
      };

      response.status(200).json(data);
    } catch (error) {
      if (error instanceof HttpError) {
        response.status(error.statusCode).json({ error: error.message });
      } else {
        response.status(500).json({ error: "Erro ao listar dados adicionais" });
      }
    }
  }

  public async delete(request: Request, response: Response) {
   const { id } = request.params;
    const aRepository = DadosAdicionaisRepositoryPrisma.build(prisma);
    const aService = DadosAdicionaisServiceImplementation.build(aRepository);

    try {
      const dadosAdicionaisExists = await aService.findById(id);
      if (!dadosAdicionaisExists) {
        throw new HttpError("Dados adicionais não encontrado", 404);
      }

      await aService.deleteById(id);
      response.status(204).send();
    } catch (error) {
      if (error instanceof HttpError) {
        response.status(error.statusCode).json({ error: error.message });
      } else {
        response.status(500).json({ error: "Erro ao deletar dados adicionais" });
      }
    }
  }

  public async update(request: Request, response: Response) {
    const { id } = request.params;
    try {
      const {
        cpf_nota_fiscal,
        tipo_residencia,
        numero_comodos,
        possui_banheiro,
        possui_agua,
        possui_luz,
        alunoId,
      } = request.body;

      const aRepository = DadosAdicionaisRepositoryPrisma.build(prisma);
      const aService = DadosAdicionaisServiceImplementation.build(aRepository);

      const dadosAdicionaisExists = await aService.findById(id);
      if (!dadosAdicionaisExists) {
        throw new HttpError("Dados adicionais não encontrado", 404);
      }

      const output = await aService.update(
        id,
        cpf_nota_fiscal,
        tipo_residencia,
        numero_comodos,
        possui_banheiro,
        possui_agua,
        possui_luz,
        alunoId
      );

      const data = {
        id: output.id,
        cpf_nota_fiscal,
        tipo_residencia,
        numero_comodos,
        possui_banheiro,
        possui_agua,
        possui_luz,
        alunoId,
      };

      response.status(200).json(data);
    } catch (error) {
      if (error instanceof HttpError) {
        response.status(error.statusCode).json({ error: error.message });
      } else {
        response.status(500).json({ error: "Erro ao atualizar dados adicionais" });
      }
    }
  }

}
