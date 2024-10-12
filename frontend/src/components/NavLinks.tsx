import { Link, useLocation } from "react-router-dom";
import { Home, Package, Users } from "lucide-react";
import { IoMdPersonAdd } from "react-icons/io";

const NavLinks: React.FC = () => {
  const location = useLocation(); 

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      <Link to="/in/dashboard">
        <div
          className={`flex items-center hover:bg-muted gap-3 rounded-lg px-3 py-2 ${
            location.pathname === "/in/dashboard"
              ? "bg-muted-foreground text-primary"
              : "text-muted-foreground hover:text-foreground transition-all"
          }`}
        >
          <Home className="h-4 w-4" />
          Home
        </div>
      </Link>
      <Link to="/in/page1">
        <div
          className={`flex items-center hover:bg-muted gap-3 rounded-lg px-3 py-2 ${
            location.pathname === "/in/page1"
              ? "bg-muted-foreground text-primary"
              : "text-muted-foreground hover:text-foreground transition-all"
          }`}
        >
          <IoMdPersonAdd className="h-4 w-4" />
          Página 1
        </div>
      </Link>
      <Link to="/in/page2">
        <div
          className={`flex items-center hover:bg-muted gap-3 rounded-lg px-3 py-2 ${
            location.pathname === "/in/page2"
              ? "bg-muted-foreground text-primary"
              : "text-muted-foreground hover:text-foreground transition-all"
          }`}
        >
          <Package className="h-4 w-4" />
          Página 2
        </div>
      </Link>
      <Link to="/in/page3">
        <div
          className={`flex items-center hover:bg-muted gap-3 rounded-lg px-3 py-2 ${
            location.pathname === "/in/page3"
              ? "bg-muted-foreground text-primary"
              : "text-muted-foreground hover:text-foreground transition-all"
          }`}
        >
          <Users className="h-4 w-4" />
          Página 3
        </div>
      </Link>
    </nav>
  );
};

export default NavLinks;
