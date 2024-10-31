import { Link, useLocation } from "react-router-dom";
import { Home, Package, Users, Group, Cake } from "lucide-react";
import { IoMdPersonAdd } from "react-icons/io";

const NavLinksMobile: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="grid gap-2 text-lg font-medium">
      <Link to="/in/dashboard">
        <div
          className={`mx-[-0.65rem] hover:bg-primary/40 flex items-center gap-4 rounded-xl px-3 py-2 ${
            location.pathname === "/in/dashboard"
              ? "bg-primary/10 text-accent"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Home className="h-5 w-5" />
          Home
        </div>
      </Link>
      <Link to="/in/page1">
        <div
          className={`mx-[-0.65rem] hover:bg-primary/40 flex items-center gap-4 rounded-xl px-3 py-2 ${
            location.pathname === "/in/page1"
              ? "bg-primary/10 text-accent"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <IoMdPersonAdd className="h-5 w-5" />
          Cadastro aluno
        </div>
      </Link>
      <Link to="/in/page2">
        <div
          className={`mx-[-0.65rem] hover:bg-primary/40 flex items-center gap-4 rounded-xl px-3 py-2 ${
            location.pathname === "/in/page2"
              ? "bg-primary/10 text-accent"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Package className="h-5 w-5" />
          Listagem alunos
        </div>
      </Link>
      <Link to="/in/page3">
        <div
          className={`mx-[-0.65rem] hover:bg-primary/40 flex items-center gap-4 rounded-xl px-3 py-2 ${
            location.pathname === "/in/page3"
              ? "bg-primary/10 text-accent"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Cake className="h-5 w-5" />
          Listagem aniversários
        </div>
      </Link>
      <Link to="/in/page4">
        <div
          className={`mx-[-0.65rem] hover:bg-primary/40 flex items-center gap-4 rounded-xl px-3 py-2 ${
            location.pathname === "/in/page4"
              ? "bg-primary/10 text-accent"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Group className="h-5 w-5" />
          Formar turmas
        </div>
      </Link>
      <Link to="/in/page5">
        <div
          className={`mx-[-0.65rem] hover:bg-primary/40 flex items-center gap-4 rounded-xl px-3 py-2 ${
            location.pathname === "/in/page5"
              ? "bg-primary/10 text-accent"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Users className="h-5 w-5" />
          Listagem turmas
        </div>
      </Link>
    </nav>
  );
};

export default NavLinksMobile;
