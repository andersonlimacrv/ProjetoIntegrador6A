import {
  DadosAdicionaisService,
  DadosAdicionaisCreateOutputDto,
  DadosAdicionaisOutputDto,
  DadosAdicionaisListOutputDto,
} from "../dadosAdicionais.service";
import { DadosAdicionaisRepository } from "../../../repositories/dadosAdicionais/dadosAdicionais.repository";
import { DadosAdicionais } from "../../../entities/dadosAdicionais";
import { HttpError } from "../../../api/error/http.error";

export class DadosAdicionaisServiceImplementation
  implements DadosAdicionaisService
{
  private constructor(readonly repository: DadosAdicionaisRepository) {}

  public static build(repository: DadosAdicionaisRepository) {
    return new DadosAdicionaisServiceImplementation(repository);
  }

  public async create(
    cpfNotaFiscal: boolean,
    tipoResidencia: string,
    numeroComodos: number,
    possuiBanheiro: boolean,
    possuiAgua: boolean,
    possuiLuz: boolean,
    alunoId: string
  ): Promise<DadosAdicionaisCreateOutputDto> {
    const dados = DadosAdicionais.create(
      cpfNotaFiscal,
      tipoResidencia,
      numeroComodos,
      possuiBanheiro,
      possuiAgua,
      possuiLuz,
      alunoId
    );
    await this.repository.save(dados);

    const output: DadosAdicionaisCreateOutputDto = {
      id: dados.id,
      cpfNotaFiscal: dados.cpfNotaFiscal,
      tipoResidencia: dados.tipoResidencia,
      numeroComodos: dados.numeroComodos,
      possuiBanheiro: dados.possuiBanheiro,
      possuiAgua: dados.possuiAgua,
      possuiLuz: dados.possuiLuz,
      alunoId: dados.alunoId,
    };
    return output;
  }

  public async list(): Promise<DadosAdicionaisListOutputDto> {
    const dados = await this.repository.list();
    const output: DadosAdicionaisListOutputDto = {
      dadosAdicionais: dados.map((d) => ({
        id: d.id,
        cpfNotaFiscal: d.cpfNotaFiscal,
        tipoResidencia: d.tipoResidencia,
        numeroComodos: d.numeroComodos,
        possuiBanheiro: d.possuiBanheiro,
        possuiAgua: d.possuiAgua,
        possuiLuz: d.possuiLuz,
        alunoId: d.alunoId,
      })),
    };
    return output;
  }

  public async update(
    id: string,
    cpfNotaFiscal: boolean,
    tipoResidencia: string,
    numeroComodos: number,
    possuiBanheiro: boolean,
    possuiAgua: boolean,
    possuiLuz: boolean,
    alunoId: string
  ): Promise<DadosAdicionaisOutputDto> {
    const dados = await this.repository.findById(id);
    if (!dados) {
      throw new HttpError("Dados adicionais não encontrados", 404);
    }

    const newDados = DadosAdicionais.with(
      id,
      cpfNotaFiscal,
      tipoResidencia,
      numeroComodos,
      possuiBanheiro,
      possuiAgua,
      possuiLuz,
      alunoId
    );
    await this.repository.update(newDados);

    const output: DadosAdicionaisOutputDto = {
      id: newDados.id,
      cpfNotaFiscal: newDados.cpfNotaFiscal,
      tipoResidencia: newDados.tipoResidencia,
      numeroComodos: newDados.numeroComodos,
      possuiBanheiro: newDados.possuiBanheiro,
      possuiAgua: newDados.possuiAgua,
      possuiLuz: newDados.possuiLuz,
      alunoId: newDados.alunoId,
    };
    return output;
  }

  public async findById(id: string): Promise<DadosAdicionaisOutputDto> {
    const dados = await this.repository.findById(id);
    if (!dados) {
      throw new HttpError("Dados adicionais não encontrados", 404);
    }
    return {
      id: dados.id,
      cpfNotaFiscal: dados.cpfNotaFiscal,
      tipoResidencia: dados.tipoResidencia,
      numeroComodos: dados.numeroComodos,
      possuiBanheiro: dados.possuiBanheiro,
      possuiAgua: dados.possuiAgua,
      possuiLuz: dados.possuiLuz,
      alunoId: dados.alunoId,
    };
  }

  public async deleteById(id: string): Promise<void> {
    const dados = await this.repository.findById(id);
    if (!dados) {
      throw new HttpError("Dados adicionais não encontrados", 404);
    }
    await this.repository.deleteById(id);
  }
}
