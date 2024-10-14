import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useTheme } from "@/components/providers/theme-provider";

const light: React.CSSProperties = {
  background: "#F7F9FB",
  color: "#161616",
  border: "1px solid #FA923D50",
  textShadow: ".5px .5px .5px #acacac",
  boxShadow: "1.5px 1.5px 1.5px #16161680",
};

const dark: React.CSSProperties = {
  background: "#161616",
  color: "#F7F9FB",
  border: "1px solid #FA923D50",
  textShadow: ".5px .5px .5px #161616",
  boxShadow: "3px 6px 9px #16161650",
};

export default function Toast() {
  // Pegue o tema do contexto
  const { theme } = useTheme();
  const [style, setStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    // Atualize o estilo com base no tema do contexto
    if (theme === "light") {
      setStyle(light);
    } else if (theme === "dark") {
      setStyle(dark);
    }
  }, [theme]); // Observe o tema do contexto

  return (
    <>
      <Toaster
        position="bottom-center"
        reverseOrder={true}
        gutter={16}
        containerClassName=""
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: style, 
        }}
      />
    </>
  );
}
