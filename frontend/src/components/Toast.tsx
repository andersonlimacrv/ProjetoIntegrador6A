// src/components/Toast.tsx
import { toast, ToastOptions } from "react-toastify";

interface ToastProps {
  type: "success" | "error" | "info"; // Tipos de toast aceitos
  message: string; // Mensagem que será exibida no toast
}

// Definindo as configurações padrão para o toast
const defaultToastOptions: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const Toast = ({ type, message }: ToastProps) => {
  // Função que exibe o toast com base no tipo e na mensagem
  const showToast = () => {
    switch (type) {
      case "success":
        toast.success(message, defaultToastOptions);
        break;
      case "error":
        toast.error(message, defaultToastOptions);
        break;
      case "info":
        toast.info(message, defaultToastOptions);
        break;
      default:
        break;
    }
  };

  // Executa o showToast assim que o componente é montado
  showToast();

  return null; // Não renderiza nada, apenas mostra o toast
};

export default Toast;
