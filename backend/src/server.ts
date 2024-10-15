import { ApiExpress } from "./api/express/api.express";
import { AlunoController } from "./api/express/controllers/aluno.controller";
import { EnderecoController } from "./api/express/controllers/endereco.controller";
function main(){
  const api = ApiExpress.build();

  const alunoController = AlunoController.build();
  const enderecoController = EnderecoController.build();


  api.addGetRoute("/alunos", alunoController.list);
  api.addPostRoute("/aluno/create", alunoController.create);
  api.addDeleteRoute("/aluno/:id", alunoController.delete);
  api.addPutRoute("/aluno/:id", alunoController.update);

  api.addGetRoute("/enderecos", enderecoController.list);
  api.addPostRoute("/endereco/create", enderecoController.create);
  api.addDeleteRoute("/endereco/:id", enderecoController.delete);
  api.addPutRoute("/endereco/:id", enderecoController.update);
  
  const PORT: number = Number(process.env.BACKEND_PORT) || 3000;
  api.start(PORT);

}

main();