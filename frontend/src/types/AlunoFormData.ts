export type AlunoFormData = {
  nome: string;
  genero: string;
  data_nascimento: string;
  telefone: string;
  ano_escolar: string;
  alfabetizado: boolean;
  turno: string;
  endereco: {
    cep: string;
    logradouro: string;
    logradouro_numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
  };
  registroGeral: {
    cpf: string;
    rg: string;
    data_emissao_rg: string;
    renda_familiar: number;
    bolsa_familia: boolean;
    direito_imagem: boolean;
  };
  dadosAdicionais: {
    cpf_nota_fiscal: boolean;
    tipo_residencia: string;
    numero_comodos: number;
    possui_banheiro: boolean;
    possui_agua: boolean;
    possui_luz: boolean;
  };
  familia: {
    numero_filhos: number;
    irmao_instituicao: boolean;
  };
  dadosMae: {
    trabalha_fora: boolean;
    com_quem_deixar: string;
    interesse_culinaria_costura: boolean;
    qual_projeto: string;
  };
  aniversario: {
    data_nascimento: string;
    proximo_aniversario: string;
  };
};
