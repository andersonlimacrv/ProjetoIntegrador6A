import { ApiExpress } from "./api/express/api.express";
import { ProductController } from "./api/express/controllers/product.controller";
import { AlunoController } from "./api/express/controllers/aluno.controller";

function main(){
  const api = ApiExpress.build();

  const productController = ProductController.build();
  const alunoController = AlunoController.build();

  api.addGetRoute("/products", productController.list);
  api.addPostRoute("/product/buy", productController.buy);
  api.addPostRoute("/product/sell", productController.sell);
  api.addPostRoute("/product/create", productController.create);

  api.addGetRoute("/alunos", alunoController.list);
  api.addPostRoute("/aluno/create", alunoController.create);
  api.addDeleteRoute("/aluno/:id", alunoController.delete);
  api.addPutRoute("/aluno/:id", alunoController.update);
  

  api.start(8000);

}

main();