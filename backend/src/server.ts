import { ApiExpress } from "./api/express/api.express";
import { ProductController } from "./api/express/controllers/product.controller";
import { AlunoController } from "./api/express/controllers/aluno.controller";

function main(){
  const api = ApiExpress.build();

  const controller = ProductController.build();
  const alunoController = AlunoController.build();

  api.addGetRoute("/products", controller.list);
  api.addPostRoute("/product/buy", controller.buy);
  api.addPostRoute("/product/sell", controller.sell);
  api.addPostRoute("/product/create", controller.create);

  api.addGetRoute("/alunos", alunoController.list);
  api.addPostRoute("/aluno/create", alunoController.create);
  /* api.addPostRoute("/aluno/update", alunoController.update);
  api.addGetRoute("/aluno/:id", alunoController.findById); */
  

  api.start(8000);

}

main();