import { ApiExpress } from "./api/express/api.express";
import { AlunoController } from "./api/express/controllers/aluno.controller";
import { EnderecoController } from "./api/express/controllers/endereco.controller";
import { TurmaController } from "./api/express/controllers/turma.controller";
import { DadosAdicionaisController } from "./api/express/controllers/dadosAdicionais.controller";
import { FamiliaController } from "./api/express/controllers/familia.controller";
import { FamiliarController } from "./api/express/controllers/familiar.controller";
import { RegistroGeralController } from "./api/express/controllers/registroGeral.controller";
import { DadosMaeController } from "./api/express/controllers/dadosMae.controller";
import { AniversarioController } from "./api/express/controllers/aniversario.controller";
import { AlunoFamiliarController } from "./api/express/controllers/alunoFamiliar.controller";
import { ResponsavelController } from "./api/express/controllers/responsavel.controller";
import cron from "node-cron";
import updateNextBirthdays from "./utils/updateNextBirthday.util";

function main() {
  const api = ApiExpress.build();

  const alunoController = AlunoController.build();
  const enderecoController = EnderecoController.build();
  const turmaController = TurmaController.build();
  const dadosAdicionaisController = DadosAdicionaisController.build();
  const familiaController = FamiliaController.build();
  const familiarController = FamiliarController.build();
  const registroGeralController = RegistroGeralController.build();
  const dadosMaeController = DadosMaeController.build();
  const aniversarioController = AniversarioController.build();
  const alunoFamiliarController = AlunoFamiliarController.build();
  const responsavelController = ResponsavelController.build();


  /* MIDNIGHT SCHEDULE - Update next birthdays */
  cron.schedule("0 0 * * *", () => {
    console.log("Executando a atualização diária dos próximos aniversários...");
    updateNextBirthdays().catch((error) => {
      console.error("Erro ao atualizar próximos aniversários:", error);
    });
  });
  /* ROTA DE UPDATE NEXT BIRTHDAYS */
  api.addGetRoute("/updateNextBirthdays", async (req, res) => {
    try {
      await updateNextBirthdays();
      res
        .status(200)
        .json({ message: "Próximos aniversários atualizados com sucesso!" });
    } catch (error) {
      console.error("Erro ao atualizar os próximos aniversários:", error);
      res
        .status(500)
        .json({ error: "Erro ao atualizar os próximos aniversários" });
    }
  });

  /* ROTAS DE ALUNOS */
  api.addGetRoute("/alunos/list", alunoController.list);
  api.addPostRoute("/aluno/create", alunoController.create);
  api.addDeleteRoute("/aluno/:id", alunoController.delete);
  api.addPutRoute("/aluno/:id", alunoController.update);
  /* ROTAS DE ENDEREÇOS */
  api.addGetRoute("/endereco/list", enderecoController.list);
  api.addPostRoute("/endereco/create", enderecoController.create);
  api.addDeleteRoute("/endereco/:id", enderecoController.delete);
  api.addPutRoute("/endereco/:id", enderecoController.update);
  /* ROTAS DADOS ADICIONAIS */
  api.addGetRoute("/dadosAdicionais/list", dadosAdicionaisController.list);
  api.addPostRoute("/dadosAdicionais/create", dadosAdicionaisController.create);
  api.addDeleteRoute("/dadosAdicionais/:id", dadosAdicionaisController.delete);
  api.addPutRoute("/dadosAdicionais/:id", dadosAdicionaisController.update);
  /* ROTAS FAMILIA */
  api.addGetRoute("/familia/list", familiaController.list);
  api.addPostRoute("/familia/create", familiaController.create);
  api.addDeleteRoute("/familia/:id", familiaController.delete);
  api.addPutRoute("/familia/:id", familiaController.update);
  /* ROTAS FAMILIAR */
  api.addGetRoute("/familiar/list", familiarController.list);
  api.addPostRoute("/familiar/create", familiarController.create);
  api.addDeleteRoute("/familiar/:id", familiarController.delete);
  api.addPutRoute("/familiar/:id", familiarController.update);
  /* REOTAS REGISTRO */
  api.addGetRoute("/registroGeral/list", registroGeralController.list);
  api.addPostRoute("/registroGeral/create", registroGeralController.create);
  api.addDeleteRoute("/registroGeral/:id", registroGeralController.delete);
  api.addPutRoute("/registroGeral/:id", registroGeralController.update);
  /* ROTAS DADOS MAE */
  api.addGetRoute("/dadosMae/list", dadosMaeController.list);
  api.addPostRoute("/dadosMae/create", dadosMaeController.create);
  api.addDeleteRoute("/dadosMae/:id", dadosMaeController.delete);
  api.addPutRoute("/dadosMae/:id", dadosMaeController.update);
  
  /* ROTAS ALUNO FAMILIAR */
  api.addGetRoute("/alunoFamiliar/list", alunoFamiliarController.list);
  api.addPostRoute("/alunoFamiliar/create", alunoFamiliarController.create);
  api.addDeleteRoute("/alunoFamiliar/:id", alunoFamiliarController.delete);
  api.addPutRoute("/alunoFamiliar/:id", alunoFamiliarController.update);
  api.addGetRoute("/alunoFamiliar/aluno/:alunoId", alunoFamiliarController.getByAlunoId);
  api.addGetRoute("/alunoFamiliar/familiar/:familiarId", alunoFamiliarController.getByFamiliarId);
  
  /* ROTAS DE ANIVERSARIO */
  api.addGetRoute("/aniversario/list", aniversarioController.list);
  api.addPostRoute("/aniversario/create", aniversarioController.create);
  api.addDeleteRoute("/aniversario/:id", aniversarioController.delete);
  api.addPutRoute("/aniversario/:id", aniversarioController.update);
  
  /* ROTAS DE RESPONSAVEL */
  api.addGetRoute("/responsavel/list", responsavelController.list);
  api.addPostRoute("/responsavel/create", responsavelController.create);
  api.addDeleteRoute("/responsavel/:id", responsavelController.delete);
  api.addPutRoute("/responsavel/:id", responsavelController.update);
  api.addGetRoute("/responsavel/:id", responsavelController.getById);
  
  /* ROTAS DE TURMAS */
  api.addGetRoute("/turma//list", turmaController.list);
  api.addPostRoute("/turma/create", turmaController.create);
  api.addDeleteRoute("/turma/:id", turmaController.delete);
  api.addPutRoute("/turma/:id", turmaController.update);

  const PORT: number = Number(process.env.BACKEND_PORT) || 3000;
  api.start(PORT);
}

main();
