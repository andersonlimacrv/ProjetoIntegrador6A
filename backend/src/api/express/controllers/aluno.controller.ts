import { Request, Response } from "express";
import { AlunoRepositoryPrisma } from "../../../repositories/aluno/prisma/aluno.repository.prisma";
import { prisma } from "../../../utils/prisma.util";
import { AlunoServiceImplementation } from "../../../services/aluno/implementation/aluno.service.implementation";

export class AlunoController {

  private constructor() {}

  public static build() {
    return new AlunoController();
  }

  public async create(request: Request, response: Response) {
    const { nome, genero, dataNascimento, telefone, anoEscolar, alfabetizado, turma, turno } = request.body;
    
  
    const aRepository = AlunoRepositoryPrisma.build(prisma);
    const aService = AlunoServiceImplementation.build(aRepository);
    
    const output = await aService.create(nome, genero, dataNascimento, telefone, anoEscolar, alfabetizado, turma, turno);
    const data = {
      id: output.id,
      nome: nome,
      genero: genero,
      dataNascimento: dataNascimento,
      telefone: telefone,
      anoEscolar: anoEscolar,
      turma: turma,
      turno: turno
    };
  
    response.status(201).json(data).send();
  }

  public async list(request: Request, response: Response) {
    const aRepository = AlunoRepositoryPrisma.build(prisma);
    const aService = AlunoServiceImplementation.build(aRepository);
    
    const output = await aService.list();
    const data = {
      alunos: output.alunos
    };
  
    response.status(200).json(data).send();
  }
}