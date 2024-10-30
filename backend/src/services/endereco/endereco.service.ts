export type EnderecoCreateOutputDto = {
  id: string;
  cep: string;
  logradouro: string;
  logradouroNumero: string;
  bairro: string;
  cidade: string;
  uf: string;
  alunoId: string;
  complemento?: string;
}

export type EnderecoOutputDto = {
  id: string;
  cep: string;
  logradouro: string;
  logradouroNumero: string;
  bairro: string;
  cidade: string;
  uf: string;
  alunoId: string;
  complemento?: string; 
}


export type EnderecoListOutputDto = {
  enderecos: {
    id: string;
    cep: string;
    logradouro: string;
    logradouroNumero: string;
    bairro: string;
    cidade: string;
    uf: string;
    alunoId: string;
    complemento?: string;
  }[];
}

export interface EnderecoService {
  create(
    cep: string,
    logradouro: string,
    logradouroNumero: string,
    bairro: string,
    cidade: string,
    uf: string,
    alunoId: string,
    complemento?: string
  ): Promise<EnderecoCreateOutputDto>;
  
  list(): Promise<EnderecoListOutputDto>;

  update(
    id: string,
    cep: string,
    logradouro: string,
    logradouroNumero: string,
    bairro: string,
    cidade: string,
    uf: string,
    alunoId: string,
    complemento?: string
  ): Promise<EnderecoOutputDto>;

  findById(id: string): Promise<EnderecoOutputDto>;
  deleteById(id: string): Promise<void>;
  findByAlunoId(alunoId: string): Promise<EnderecoOutputDto | null>;
}