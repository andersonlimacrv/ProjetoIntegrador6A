import { Card } from "@/components/ui/card";
import { Button} from "@/components/ui/button";
import { Link } from "react-router-dom";
export default function Dashboard() {
  
  return (
    <div className="flex-col items-center justify-center">
      <div className="flex-col items-center justify-center ">
        <div className="text-center text-2xl font-semibold py-8">
          Bem vindo à plataforma de cadastro e gerenciamento de alunos do IMDAZ.
        </div>
        <p className="text-center flex justify-center text-xl text-accent py-12">
          {" "}
          Oque você pretende fazer hoje?
        </p>
      </div>
      {/* Listagem de funções da aplicação */}
      <div className="flex-col flex md:flex-row items-center justify-center p-4">
        <div className="flex flex-col items-center justify-center flex-1 p-2">
          <Card className="w-full min-w-80 h-[400px] flex flex-col items-center justify-start pt-12">
            <div className="text-center text-2xl font-semibold pb-16">
              Alunos
            </div>
            <div className="w-full mb-4 flex flex-col space-y-4 px-4">
              <Link to="/in/page1">
                <Button className="w-full hover:border-accent border-2 h-full py-4">
                  Cadastrar aluno
                </Button>
              </Link>
              <Link to="/in/page2">
                <Button className="w-full hover:border-accent border-2 h-full py-4">
                  Visualizar cadastros
                </Button>
              </Link>
              <Link to="/in/page3">
                <Button className="w-full hover:border-accent border-2 h-full py-4">
                  Lista de Aniversários
                </Button>
              </Link>
            </div>
          </Card>
        </div>
        <div className="flex flex-col items-center justify-center flex-1 p-2">
          <Card className="w-full h-[400px] flex flex-col items-center justify-start pt-12">
            <div className="text-center text-2xl font-semibold pb-16">
              Turmas
            </div>
            <div className="w-full min-w-80 mb-4 flex flex-col space-y-4 px-4">
              <Link to="/in/page4">
                <Button className="w-full hover:border-accent border-2 h-full py-4">
                  Formar turmas
                </Button>
              </Link>
              <Link to="/in/page5">
                <Button className="w-full  hover:border-accent border-2 h-full py-4">
                  Visualizar turmas
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
