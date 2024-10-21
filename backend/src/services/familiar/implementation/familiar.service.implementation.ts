import {
  FamiliarService,
  FamiliarCreateOutputDto,
  FamiliarOutputDto,
  FamiliarListOutputDto,
} from "../familiar.service";
import { FamiliarRepository } from "../../../repositories/familiar/familiar.repository";
import { Familiar } from "../../../entities/familiar";
import { HttpError } from "../../../api/error/http.error";

export class FamiliarServiceImplementation implements FamiliarService {
  private constructor(readonly repository: FamiliarRepository) {}

  public static build(repository: FamiliarRepository) {
    return new FamiliarServiceImplementation(repository);
  }

  public async create(
    nome: string,
    parentesco: string,
    telefone: string,
    autorizadoBuscar: boolean,
    responsavel: boolean
  ): Promise<FamiliarCreateOutputDto> {
    const familiar = Familiar.create(
      nome,
      parentesco,
      telefone,
      autorizadoBuscar,
      responsavel
    );
    await this.repository.save(familiar);

    const output: FamiliarCreateOutputDto = {
      id: familiar.id,
      nome: familiar.nome,
      parentesco: familiar.parentesco,
      telefone: familiar.telefone,
      autorizadoBuscar: familiar.autorizadoBuscar,
      responsavel: familiar.responsavel,
    };
    return output;
  }

  public async list(): Promise<FamiliarListOutputDto> {
    const familiares = await this.repository.list();
    const output: FamiliarListOutputDto = {
      familiares: familiares.map((f) => ({
        id: f.id,
        nome: f.nome,
        parentesco: f.parentesco,
        telefone: f.telefone,
        autorizadoBuscar: f.autorizadoBuscar,
        responsavel: f.responsavel,
      })),
    };
    return output;
  }

  public async update(
    id: string,
    nome: string,
    parentesco: string,
    telefone: string,
    autorizadoBuscar: boolean,
    responsavel: boolean
  ): Promise<FamiliarOutputDto> {
    const familiar = await this.repository.findById(id);
    if (!familiar) {
      throw new HttpError("Familiar não encontrado", 404);
    }

    const newFamiliar = Familiar.with(
      id,
      nome,
      parentesco,
      telefone,
      autorizadoBuscar,
      responsavel
    );
    await this.repository.update(newFamiliar);

    const output: FamiliarOutputDto = {
      id: newFamiliar.id,
      nome: newFamiliar.nome,
      parentesco: newFamiliar.parentesco,
      telefone: newFamiliar.telefone,
      autorizadoBuscar: newFamiliar.autorizadoBuscar,
      responsavel: newFamiliar.responsavel,
    };
    return output;
  }

  public async findById(id: string): Promise<FamiliarOutputDto> {
    const familiar = await this.repository.findById(id);
    if (!familiar) {
      throw new HttpError("Familiar não encontrado", 404);
    }
    return {
      id: familiar.id,
      nome: familiar.nome,
      parentesco: familiar.parentesco,
      telefone: familiar.telefone,
      autorizadoBuscar: familiar.autorizadoBuscar,
      responsavel: familiar.responsavel,
    };
  }

  public async deleteById(id: string): Promise<void> {
    const familiar = await this.repository.findById(id);
    if (!familiar) {
      throw new HttpError("Familiar não encontrado", 404);
    }
    await this.repository.deleteById(id);
  }
}
