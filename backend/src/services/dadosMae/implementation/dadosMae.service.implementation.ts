import {
  DadosMaeService,
  DadosMaeCreateOutputDto,
  DadosMaeListOutputDto,
  DadosMaeOutputDto,
} from "../dadosMae.service";
import { DadosMae } from "../../../entities/dadosMae";
import { DadosMaeRepository } from "../../../repositories/dadosMae/dadosMae.repository";
import { HttpError } from "../../../api/error/http.error";

export class DadosMaeServiceImplementation implements DadosMaeService {
  private constructor(readonly dadosMaeRepository: DadosMaeRepository) {}

  public static build(repository: DadosMaeRepository) {
    return new DadosMaeServiceImplementation(repository);
  }

  public async create(
    trabalhaFora: boolean,
    comQuemDeixar: string,
    interesseCulinariaCostura: boolean,
    alunoId: string,
    qualProjeto?: string
  ): Promise<DadosMaeCreateOutputDto> {
    const dadosMae = DadosMae.create(
      trabalhaFora,
      comQuemDeixar,
      interesseCulinariaCostura,
      alunoId,
      qualProjeto
    );

    await this.dadosMaeRepository.save(dadosMae);

    const output: DadosMaeCreateOutputDto = {
      id: dadosMae.id,
      trabalhaFora: dadosMae.trabalhaFora,
      comQuemDeixar: dadosMae.comQuemDeixar,
      interesseCulinariaCostura: dadosMae.interesseCulinariaCostura,
      qualProjeto: dadosMae.qualProjeto,
      alunoId: dadosMae.alunoId,
    };

    return output;
  }

  public async update(
    id: string,
    trabalhaFora: boolean,
    comQuemDeixar: string,
    interesseCulinariaCostura: boolean,
    alunoId: string,
    qualProjeto?: string
  ): Promise<DadosMaeOutputDto> {
    const dadosMae = await this.dadosMaeRepository.findById(id);
    if (!dadosMae) {
      throw new HttpError(`Dados Mae ${id} não encontrado`, 404);
    }
    const updateDadosMae = DadosMae.create(
      trabalhaFora,
      comQuemDeixar,
      interesseCulinariaCostura,
      alunoId,
      qualProjeto
    );
    await this.dadosMaeRepository.update(dadosMae);
    const output: DadosMaeOutputDto = {
      id: updateDadosMae.id,
      trabalhaFora: updateDadosMae.trabalhaFora,
      comQuemDeixar: updateDadosMae.comQuemDeixar,
      interesseCulinariaCostura: updateDadosMae.interesseCulinariaCostura,
      qualProjeto: updateDadosMae.qualProjeto,
      alunoId: updateDadosMae.alunoId,
    };
    return output;
  }

  public async list(): Promise<DadosMaeListOutputDto> {
    const dadosMaes = await this.dadosMaeRepository.list();
    const output = {
      dadosMaes: dadosMaes.map((dm) => ({
        id: dm.id,
        trabalhaFora: dm.trabalhaFora,
        comQuemDeixar: dm.comQuemDeixar,
        interesseCulinariaCostura: dm.interesseCulinariaCostura,
        qualProjeto: dm.qualProjeto,
        alunoId: dm.alunoId,
      })),
    };

    return output;
  }

  public async findById(id: string): Promise<DadosMaeOutputDto> {
    const dadosMae = await this.dadosMaeRepository.findById(id);
    if (!dadosMae) {
      throw new HttpError(`Dados Mae ${id} não encontrado`, 404);
    }
    const output: DadosMaeOutputDto = {
      id: dadosMae.id,
      trabalhaFora: dadosMae.trabalhaFora,
      comQuemDeixar: dadosMae.comQuemDeixar,
      interesseCulinariaCostura: dadosMae.interesseCulinariaCostura,
      qualProjeto: dadosMae.qualProjeto,
      alunoId: dadosMae.alunoId,
    };

    return output;
  }

  public async deleteById(id: string): Promise<void> {
    const dadosMae = await this.dadosMaeRepository.findById(id);
    if (!dadosMae) {
      throw new HttpError(`Dados Mae ${id} não encontrado`, 404);
    }
    await this.dadosMaeRepository.deleteById(id);
  }

  public async findByAlunoId(
    alunoId: string
  ): Promise<DadosMaeOutputDto | null> {
    const dadosMaes = await this.dadosMaeRepository.findByAlunoId(alunoId);
    if (!dadosMaes) {
      throw new HttpError(`Dados Mae ${alunoId} não encontrado`, 404);
    }

    const output: DadosMaeOutputDto = {
      id: dadosMaes.id,
      trabalhaFora: dadosMaes.trabalhaFora,
      comQuemDeixar: dadosMaes.comQuemDeixar,
      interesseCulinariaCostura: dadosMaes.interesseCulinariaCostura,
      qualProjeto: dadosMaes.qualProjeto,
      alunoId: dadosMaes.alunoId,
    };

    return output;
  }

}