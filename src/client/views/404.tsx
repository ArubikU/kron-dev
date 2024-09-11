import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { ClasicTheme as themeColors } from "../../themes/ClasicTheme"; // Asegúrate de importar tu objeto de colores

export default function Error404() {
  const navigate = useNavigate();

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${themeColors.gradient}`}>
      <h1 className={`text-6xl font-bold mb-4 ${themeColors.fullTextColor}`}>
        404
      </h1>
      <p className={`text-xl mb-8 ${themeColors.subTextColor}`}>
        Lo sentimos, la página que buscas no existe.
      </p>
      <Button 
        className={`${themeColors.mainColor} ${themeColors.fullTextColor}`} 
        onClick={() => navigate("/")}
      >
        Volver al Inicio
      </Button>
    </div>
  );
}
