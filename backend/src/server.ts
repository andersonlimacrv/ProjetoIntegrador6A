import { ApiExpress } from "./api/express/api.express";
import { AlunoController } from "./api/express/controllers/aluno.controller";
import { EnderecoController } from "./api/express/controllers/endereco.controller";
import { TurmaController } from "./api/express/controllers/turma.controller";
import { DadosAdicionaisController } from "./api/express/controllers/dadosAdicionais.controller";
import { FamiliaController } from "./api/express/controllers/familia.controller";
import { FamiliarController } from "./api/express/controllers/familiar.controller";
import { RegistroGeralController } from "./api/express/controllers/registroGeral.controller";
import { DadosMaeController } from "./api/express/controllers/dadosMae.controller";

function main(){
  const api = ApiExpress.build();

  const alunoController = AlunoController.build();
  const enderecoController = EnderecoController.build();
  const turmaController = TurmaController.build();
  const dadosAdicionaisController = DadosAdicionaisController.build();
  const familiaController = FamiliaController.build();
  const familiarController = FamiliarController.build();
  const registroGeralController = RegistroGeralController.build();
  const dadosMaeController = DadosMaeController.build();



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
  /* ROTAS FAMILIA */
  api.addGetRoute("/familia", familiaController.list);
  api.addPostRoute("/familia/create", familiaController.create);
  api.addDeleteRoute("/familia/:id", familiaController.delete);
  api.addPutRoute("/familia/:id", familiaController.update);
  /* ROTAS FAMILIAR */
  api.addGetRoute("/familiar", familiarController.list);
  api.addPostRoute("/familiar/create", familiarController.create);
  api.addDeleteRoute("/familiar/:id", familiarController.delete);
  api.addPutRoute("/familiar/:id", familiarController.update);
  /* REOTAS REGISTRO */
  api.addGetRoute("/registroGeral", registroGeralController.list);
  api.addPostRoute("/registroGeral/create", registroGeralController.create);
  api.addDeleteRoute("/registroGeral/:id", registroGeralController.delete);
  api.addPutRoute("/registroGeral/:id", registroGeralController.update);
  /* ROTAS DADOS MAE */
  api.addGetRoute("/dadosMae", dadosMaeController.list);
  api.addPostRoute("/dadosMae/create", dadosMaeController.create);
  api.addDeleteRoute("/dadosMae/:id", dadosMaeController.delete);
  api.addPutRoute("/dadosMae/:id", dadosMaeController.update);
  
  const PORT: number = Number(process.env.BACKEND_PORT) || 3000;
  api.start(PORT);

}

main();