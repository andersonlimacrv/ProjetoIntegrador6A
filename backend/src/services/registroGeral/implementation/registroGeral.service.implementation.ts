import {
  RegistroGeralService,
  RegistroGeralOutputDto,
  RegistroGeralCreateOutputDto,
  RegistroGeralListOutputDto,
} from "../registroGeral.service";
import { RegistroGeral } from "../../../entities/registroGeral";
import { RegistroGeralRepository } from "../../../repositories/registroGeral/registroGeral.repository";
import { HttpError } from "../../../api/error/http.error";


export class RegistroGeralServiceImplementation implements RegistroGeralService {
  private constructor(readonly repository: RegistroGeralRepository) {}

  public static build(repository: RegistroGeralRepository) {
    return new RegistroGeralServiceImplementation(repository);
    
}
  public async create(
    cpf: string,
    rg: string,
    data_emissao_rg: Date,
    renda_familiar: number,
    bolsa_familia: boolean,
    direito_imagem: boolean,
    alunoId: string,
    responsavelId: string
  ): Promise<RegistroGeralCreateOutputDto> {
    const registro = RegistroGeral.create(
      cpf,
      rg,
      data_emissao_rg,
      renda_familiar,
      bolsa_familia,
      direito_imagem,
      alunoId,
      responsavelId
    );
    await this.repository.save(registro);

    const output: RegistroGeralOutputDto = {
      id: registro.id,
      cpf: registro.cpf,
      rg: registro.rg,
      dataEmissaoRg: registro.dataEmissaoRg,
      rendaFamiliar: registro.rendaFamiliar,
      bolsaFamilia: registro.bolsaFamilia,
      direitoImagem: registro.direitoImagem,
      alunoId: registro.alunoId,
      responsavelId: registro.responsavelId,
    };
    return output;
  }

  public async list(): Promise<RegistroGeralListOutputDto> {
    const registros = await this.repository.list();
    const output: RegistroGeralListOutputDto = {
      registrosGerais: registros.map((r) => ({
        id: r.id,
        cpf: r.cpf,
        rg: r.rg,
        dataEmissaoRg: r.dataEmissaoRg,
        rendaFamiliar: r.rendaFamiliar,
        bolsaFamilia: r.bolsaFamilia,
        direitoImagem: r.direitoImagem,
        alunoId: r.alunoId,
        responsavelId: r.responsavelId,
      })),
    };
    return output;
  }

  public async update(
    id: string,
    cpf: string,
    rg: string,
    data_emissao_rg: Date,
    renda_familiar: number,
    bolsa_familia: boolean,
    direito_imagem: boolean,
    alunoId: string,
    responsavelId: string
  ): Promise<RegistroGeralOutputDto> {
    const registro = await this.repository.findById(id);
    if (!registro) {
      throw new HttpError("Registro Geral não encontrado", 404);
    }

    const newRegistro = RegistroGeral.with(
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
    await this.repository.update(newRegistro);

    const output: RegistroGeralOutputDto = {
      id: newRegistro.id,
      cpf: newRegistro.cpf,
      rg: newRegistro.rg,
      dataEmissaoRg: newRegistro.dataEmissaoRg,
      rendaFamiliar: newRegistro.rendaFamiliar,
      bolsaFamilia: newRegistro.bolsaFamilia,
      direitoImagem: newRegistro.direitoImagem,
      alunoId: newRegistro.alunoId,
      responsavelId: newRegistro.responsavelId,
    };
    return output;
  }

  public async findById(id: string): Promise<RegistroGeralOutputDto> {
    const registro = await this.repository.findById(id);
    if (!registro) {
      throw new HttpError("Registro Geral não encontrado", 404);
    }
    return {
      id: registro.id,
      cpf: registro.cpf,
      rg: registro.rg,
      dataEmissaoRg: registro.dataEmissaoRg,
      rendaFamiliar: registro.rendaFamiliar,
      bolsaFamilia: registro.bolsaFamilia,
      direitoImagem: registro.direitoImagem,
      alunoId: registro.alunoId,
      responsavelId: registro.responsavelId,
    };
  }

  public async deleteById(id: string): Promise<void> {
    const registro = await this.repository.findById(id);
    if (!registro) {
      throw new HttpError("Registro Geral não encontrado", 404);
    }
    await this.repository.deleteById(id);
  }
}
