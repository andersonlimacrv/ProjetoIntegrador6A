import { Link, useLocation } from "react-router-dom";
import { Home, Package, Users } from "lucide-react";
import { IoMdPersonAdd } from "react-icons/io";

const NavLinksMobile: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="grid gap-2 text-lg font-medium">
      <Link to="/in/dashboard">
        <div
          className={`mx-[-0.65rem] hover:bg-muted flex items-center gap-4 rounded-xl px-3 py-2 ${
            location.pathname === "/in/dashboard"
              ? "bg-muted text-accent"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Home className="h-5 w-5" />
          Home
        </div>
      </Link>
      <Link to="/in/page1">
        <div
          className={`mx-[-0.65rem] hover:bg-muted flex items-center gap-4 rounded-xl px-3 py-2 ${
            location.pathname === "/in/page1"
              ? "bg-muted text-accent"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <IoMdPersonAdd className="h-5 w-5" />
          Página 1
        </div>
      </Link>
      <Link to="/in/page2">
        <div
          className={`mx-[-0.65rem] hover:bg-muted flex items-center gap-4 rounded-xl px-3 py-2 ${
            location.pathname === "/in/page2"
              ? "bg-muted text-accent"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Package className="h-5 w-5" />
          Página 2
        </div>
      </Link>
      <Link to="/in/page3">
        <div
          className={`mx-[-0.65rem] hover:bg-muted flex items-center gap-4 rounded-xl px-3 py-2 ${
            location.pathname === "/in/page3"
              ? "bg-muted text-accent"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Users className="h-5 w-5" />
          Página 3
        </div>
      </Link>
    </nav>
  );
};

export default NavLinksMobile;
