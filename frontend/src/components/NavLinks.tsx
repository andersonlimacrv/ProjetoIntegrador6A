import { Link, useLocation } from "react-router-dom";
import { Home, Package, Users, Group, Cake } from "lucide-react";
import { IoMdPersonAdd } from "react-icons/io";

const NavLinks: React.FC = () => {
  const location = useLocation(); 

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      <Link to="/in/dashboard">
        <div
          className={`flex items-center hover:bg-primary/40 gap-3 rounded-lg px-3 py-2 ${
            location.pathname === "/in/dashboard"
              ? "bg-primary/10 text-accent"
              : "text-muted-foreground hover:text-foreground transition-all"
          }`}
        >
          <Home className="h-4 w-4" />
          Home
        </div>
      </Link>
      <Link to="/in/page1">
        <div
          className={`flex items-center hover:bg-primary/40 gap-3 rounded-lg px-3 py-2 ${
            location.pathname === "/in/page1"
              ? "bg-primary/10 text-accent"
              : "text-muted-foreground hover:text-foreground transition-all"
          }`}
        >
          <IoMdPersonAdd className="h-4 w-4" />
          Cadastro aluno
        </div>
      </Link>
      <Link to="/in/page2">
        <div
          className={`flex items-center hover:bg-primary/40 gap-3 rounded-lg px-3 py-2 ${
            location.pathname === "/in/page2"
              ? "bg-primary/10 text-accent"
              : "text-muted-foreground hover:text-foreground transition-all"
          }`}
        >
          <Package className="h-4 w-4" />
          Listagem alunos
        </div>
      </Link>
      <Link to="/in/page3">
        <div
          className={`flex items-center hover:bg-primary/40 gap-3 rounded-lg px-3 py-2 ${
            location.pathname === "/in/page3"
              ? "bg-primary/10 text-accent"
              : "text-muted-foreground hover:text-foreground transition-all"
          }`}
        >
          <Cake className="h-4 w-4" />
          Listagem aniversários
        </div>
      </Link>
      <Link to="/in/page4">
        <div
          className={`flex items-center hover:bg-primary/40 gap-3 rounded-lg px-3 py-2 ${
            location.pathname === "/in/page4"
              ? "bg-primary/10 text-accent"
              : "text-muted-foreground hover:text-foreground transition-all"
          }`}
        >
          <Group className="h-4 w-4" />
          Formar turmas
        </div>
      </Link>
      <Link to="/in/page5">
        <div
          className={`flex items-center hover:bg-primary/40 gap-3 rounded-lg px-3 py-2 ${
            location.pathname === "/in/page5"
              ? "bg-primary/10 text-accent"
              : "text-muted-foreground hover:text-foreground transition-all"
          }`}
        >
          <Users className="h-4 w-4" />
          Listagem turmas
        </div>
      </Link>
    </nav>
  );
};

export default NavLinks;
