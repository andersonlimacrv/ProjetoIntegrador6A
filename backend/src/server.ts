import { ApiExpress } from "./api/express/api.express";
import { AlunoController } from "./api/express/controllers/aluno.controller";

function main(){
  const api = ApiExpress.build();

  const alunoController = AlunoController.build();

  api.addGetRoute("/alunos", alunoController.list);
  api.addPostRoute("/aluno/create", alunoController.create);
  api.addDeleteRoute("/aluno/:id", alunoController.delete);
  api.addPutRoute("/aluno/:id", alunoController.update);
  
  const PORT: number = Number(process.env.BACKEND_PORT) || 3000;
  api.start(PORT);

}

main();