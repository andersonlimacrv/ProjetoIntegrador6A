import { ApiExpress } from "./api/express/api.express";
import { AlunoController } from "./api/express/controllers/aluno.controller";
import { EnderecoController } from "./api/express/controllers/endereco.controller";
import { TurmaController } from "./api/express/controllers/turma.controller";
import { DadosAdicionaisController } from "./api/express/controllers/dadosAdicionais.controller";

function main(){
  const api = ApiExpress.build();

  const alunoController = AlunoController.build();
  const enderecoController = EnderecoController.build();
  const turmaController = TurmaController.build();
  const dadosAdicionaisController = DadosAdicionaisController.build();

  /* ROTAS DE ALUNOS */
  api.addGetRoute("/alunos", alunoController.list);
  api.addPostRoute("/aluno/create", alunoController.create);
  api.addDeleteRoute("/aluno/:id", alunoController.delete);
  api.addPutRoute("/aluno/:id", alunoController.update);
  /* ROTAS DE ENDEREÇOS */
  api.addGetRoute("/enderecos", enderecoController.list);
  api.addPostRoute("/endereco/create", enderecoController.create);
  api.addDeleteRoute("/endereco/:id", enderecoController.delete);
  api.addPutRoute("/endereco/:id", enderecoController.update);
  /* ROTAS DE TURMAS */
  api.addGetRoute("/turmas", turmaController.list);
  api.addPostRoute("/turma/create", turmaController.create);
  api.addDeleteRoute("/turma/:id", turmaController.delete);
  api.addPutRoute("/turma/:id", turmaController.update);
  /* ROTAS DADOS ADICIONAIS */
  api.addGetRoute("/dadosAdicionais", dadosAdicionaisController.list);
  api.addPostRoute("/dadosAdicionais/create", dadosAdicionaisController.create);
  api.addDeleteRoute("/dadosAdicionais/:id", dadosAdicionaisController.delete);
  api.addPutRoute("/dadosAdicionais/:id", dadosAdicionaisController.update);

  
  const PORT: number = Number(process.env.BACKEND_PORT) || 3000;
  api.start(PORT);

}

main();