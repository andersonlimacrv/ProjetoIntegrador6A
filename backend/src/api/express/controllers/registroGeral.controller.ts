import { Request, Response } from "express";
import { RegistroGeralRepositoryPrisma } from "../../../repositories/registroGeral/prisma/registroGeral.repository.prisma";
import { RegistroGeralServiceImplementation } from "../../../services/registroGeral/implementation/registroGeral.service.implementation";
import { prisma } from "../../../utils/prisma.util";
import { HttpError } from "../../error/http.error";

export class RegistroGeralController {
  private constructor() {}

  public static build() {
    return new RegistroGeralController();
  }

  public async create(request: Request, response: Response) {
    try {
      const rgRepository = RegistroGeralRepositoryPrisma.build(prisma);
      const rgService = RegistroGeralServiceImplementation.build(rgRepository);

      const {
        cpf,
        rg,
        data_emissao_rg,
        renda_familiar,
        bolsa_familia,
        direito_imagem,
        alunoId,
        responsavelId,
      } = request.body;
      const rgCreated = await rgService.create(
        cpf,
        rg,
        data_emissao_rg,
        renda_familiar,
        bolsa_familia,
        direito_imagem,
        alunoId,
        responsavelId
      );

      response.status(201).json(rgCreated);
    } catch (error) {
      if (error instanceof HttpError) {
        response.status(error.statusCode).json({ error: error.message });
      } else {
        response.status(500).json({ error: "Erro ao criar rg" });
      }
    }
  }
  
  public async list(request: Request, response: Response) {
    try {
      const rgRepository = RegistroGeralRepositoryPrisma.build(prisma);
      const rgService = RegistroGeralServiceImplementation.build(rgRepository);

      const output = await rgService.list();

      const data = {
        registros_gerais: output.registrosGerais,
      };

      response.status(200).json(data);
    } catch (error) {
      if (error instanceof HttpError) {
        response.status(error.statusCode).json({ error: error.message });
      } else {
        response.status(500).json({ error: "Erro ao listar rg" });
      }
    }
  }

  public async delete(request: Request, response: Response) {
      const { id } = request.params;
      const rgRepository = RegistroGeralRepositoryPrisma.build(prisma);
      const rgService = RegistroGeralServiceImplementation.build(rgRepository);


      try{
        const rgExist = await rgService.findById(id);
        if (!rgExist) {
          throw new HttpError("Registro geral não encontrado", 404);
        }
         await rgService.deleteById(id);
         response.status(204).send();

      } catch(error) {
        if (error instanceof HttpError) {
          response.status(error.statusCode).json({ error: error.message });
        } else {
          response.status(500).json({ error: "Erro ao deletar rg" });
        }
      }
  }

  public async update(request: Request, response: Response) {
    try{
      const { id } = request.params;
      const {
        cpf,
        rg,
        data_emissao_rg,
        renda_familiar,
        bolsa_familia,
        direito_imagem,
        alunoId,
        responsavelId,
      } = request.body;

      const rgRepository = RegistroGeralRepositoryPrisma.build(prisma);
      const rgService = RegistroGeralServiceImplementation.build(rgRepository);

      const output = await rgService.update(
        id,
        cpf,
        rg,
        data_emissao_rg,
        renda_familiar,
        bolsa_familia,
        direito_imagem,
        alunoId,
        responsavelId
      );

      const data = {
        id: output.id,
        cpf: output.cpf,
        rg: output.rg,
        data_emissao_rg: output.dataEmissaoRg,
        renda_familiar: output.rendaFamiliar,
        bolsa_familia: output.bolsaFamilia,
        direito_imagem: output.direitoImagem,
        alunoId: output.alunoId,
        responsavelId: output.responsavelId
      };

      response.status(200).json(data);
    } catch (error) {
      if (error instanceof HttpError) {
        response.status(error.statusCode).json({ error: error.message });
      } else {
        response.status(500).json({ error: "Erro ao atualizar rg" });
      }
    }
  }
}
