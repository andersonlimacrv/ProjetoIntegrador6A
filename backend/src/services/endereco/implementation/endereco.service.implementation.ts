import {
  EnderecoService,
  EnderecoCreateOutputDto,
  EnderecoOutputDto,
  EnderecoListOutputDto,
} from "../endereco.service";
import { EnderecoRepository } from "../../../repositories/endereco/endereco.repository";
import { Endereco } from "../../../entities/endereco";
import { HttpError } from "../../../api/error/http.error";

export class EnderecoServiceImplementation implements EnderecoService {
  private constructor(readonly repository: EnderecoRepository) {}

  public static build(repository: EnderecoRepository) {
    return new EnderecoServiceImplementation(repository);
  }

  public async create(
    cep: string,
    logradouro: string,
    logradouroNumero: string,
    bairro: string,
    cidade: string,
    uf: string,
    alunoId: string,
    complemento?: string
  ): Promise<EnderecoCreateOutputDto> {
    const address = Endereco.create(
      cep,
      logradouro,
      logradouroNumero,
      bairro,
      cidade,
      uf,
      alunoId,
      complemento
    );
    await this.repository.save(address);

    const output: EnderecoCreateOutputDto = {
      id: address.id,
      cep: address.cep,
      logradouro: address.logradouro,
      logradouroNumero: address.logradouroNumero,
      bairro: address.bairro,
      cidade: address.cidade,
      uf: address.uf,
      complemento: address.complemento,
      alunoId: address.alunoId,
    };
    return output;
  }

  public async list(): Promise<EnderecoListOutputDto> {
    const addresses = await this.repository.list();
    const output: EnderecoListOutputDto = {
      enderecos: addresses.map((a) => ({
        id: a.id,
        cep: a.cep,
        logradouro: a.logradouro,
        logradouroNumero: a.logradouroNumero,
        bairro: a.bairro,
        cidade: a.cidade,
        uf: a.uf,
        complemento: a.complemento,
        alunoId: a.alunoId,
      })),
    };
    return output;
  }

  public async update(
    id: string,
    cep: string,
    logradouro: string,
    logradouroNumero: string,
    bairro: string,
    cidade: string,
    uf: string,
    alunoId: string,
    complemento?: string
  ): Promise<EnderecoOutputDto> {
    const address = await this.repository.findById(id);
    if (!address) {
      throw new HttpError("Endereço não encontrado", 404);
    }
    const newAddress = Endereco.with(
      id,
      cep,
      logradouro,
      logradouroNumero,
      bairro,
      cidade,
      uf,
      alunoId,
      complemento
    );
    await this.repository.update(newAddress);
    const output: EnderecoOutputDto = {
      id: newAddress.id,
      cep: newAddress.cep,
      logradouro: newAddress.logradouro,
      logradouroNumero: newAddress.logradouroNumero,
      bairro: newAddress.bairro,
      cidade: newAddress.cidade,
      uf: newAddress.uf,
      alunoId: newAddress.alunoId,
      complemento: newAddress.complemento,
    };
    return output;
  }

  public async findById(id: string): Promise<EnderecoOutputDto> {
    const address = await this.repository.findById(id);
    if (!address) {
      throw new HttpError("Endereço não encontrado", 404);
    }
    return {
      id: address.id,
      cep: address.cep,
      logradouro: address.logradouro,
      logradouroNumero: address.logradouroNumero,
      bairro: address.bairro,
      cidade: address.cidade,
      uf: address.uf,
      alunoId: address.alunoId,
      complemento: address.complemento,
    };
  }

  public async deleteById(id: string): Promise<void> {
    const address = await this.repository.findById(id);
    if (!address) {
      throw new HttpError("Endereço não encontrado", 404);
    }
    await this.repository.deleteById(id);
  }

  public async findByAlunoId(
    alunoId: string
  ): Promise<EnderecoOutputDto | null> {
    const address = await this.repository.findByAlunoId(alunoId);
    if (!address) {
      return null;
    }
    return {
      id: address.id,
      cep: address.cep,
      logradouro: address.logradouro,
      logradouroNumero: address.logradouroNumero,
      bairro: address.bairro,
      cidade: address.cidade,
      uf: address.uf,
      alunoId: address.alunoId,
      complemento: address.complemento,
    };
  }
}
