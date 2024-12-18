import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Home from "@/pages/Home";
import ProtectedPage from "@/pages/ProtectedPage";
import Page1 from "@/pages/dashboard/Page1";
import Page2 from "@/pages/dashboard/Page2";
import Page3 from "@/pages/dashboard/Page3";
import Page4 from "@/pages/dashboard/Page4";
import Page5 from "@/pages/dashboard/Page5";
import Dashboard from "./pages/dashboard";

import { ThemeProvider } from "./components/providers/theme-provider";
import Toast from "./components/ui/Toast";
import toast from 'react-hot-toast';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (username: string, password: string) => {
    if (username === "usuario" && password === "12345") {
      setIsAuthenticated(true);
    } else {
      toast.error("Credenciais incorretas!");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    toast.success("Logout efetuado com sucesso!");
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toast/>
      <Router>
        <Routes>
          <Route path="/" element={<Home onLogin={handleLogin} />} />
          <Route
            path="/in"
            element={
              isAuthenticated ? (
                <ProtectedPage onLogout={handleLogout} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="page1" element={<Page1 />} />
            <Route path="page2" element={<Page2 />} />
            <Route path="page3" element={<Page3 />} />
            <Route path="page4" element={<Page4 />} />
            <Route path="page5" element={<Page5 />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
