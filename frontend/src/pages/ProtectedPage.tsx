import { Outlet } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { BiSupport } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { SlDocs } from "react-icons/sl";
import { CircleUser, Menu, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import LogoImdaz from "@/components/images/LogoImdaz";
import NotificationButton from "@/components/NotificationButton";
import NavLinks from "@/components/NavLinks"; // Importando NavLinks
import NavLinksMobile from "@/components/NavLinksMobile"; // Importando NavLinksMobile

import { ModeToggle } from "@/components/mode-toggle";

type ProtectedPageProps = {
  onLogout: () => void;
};

const ProtectedPage = ({ onLogout }: ProtectedPageProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-20 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <div className="flex items-center gap-2 font-semibold">
              <LogoImdaz />
              <span className="text-xl font-bold tracking-widest bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
                IMDAZ
              </span>
            </div>
          </div>
          <div className="flex-1 py-4">
            <NavLinks /> {/* Usando NavLinks aqui */}
          </div>
          <div className="mt-auto p-4">
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="w-full"
            >
              <CiLogout className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-20 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <div className="flex mx-auto w-full px-[15%]">
                    <LogoImdaz />
                  </div>
                </div>
                <div className="py-8">
                  <NavLinksMobile /> 
                </div>
              </nav>
              <div className="mt-auto">
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <CiLogout className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search anything... "
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <ModeToggle />
          <NotificationButton />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Bem vindo, Usuário.</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button variant="ghost" size="sm" className="w-full">
                  <IoSettingsOutline className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button variant="ghost" size="sm" className="w-full">
                  <BiSupport className="mr-2 h-4 w-4" />
                  Suport
                </Button>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  size="sm"
                  className="w-full"
                >
                  <CiLogout className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <SlDocs className="ml-2 mr-6 text-muted-foreground py-auto" />
            <h1 className="text-lg font-bold tracking-wider text-muted-foreground md:text-2xl">
              Controle de alunos
            </h1>
          </div>
          <div
            className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
            x-chunk="dashboard-02-chunk-1"
          >
            <div className="flex flex-col items-center gap-1 text-center">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProtectedPage;
