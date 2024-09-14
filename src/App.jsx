import "bootstrap/dist/css/bootstrap.min.css"; // Importa los estilos CSS de Bootstrap
import "bootstrap/dist/js/bootstrap.min.js";  // Importa el JavaScript de Bootstrap para funcionalidades dinámicas como modales y carruseles
import 'boxicons/css/boxicons.min.css'; // Importa los íconos de Boxicons

// Importación de estilos generales del proyecto
import "./styles/styles-general.module.scss"

import AppRouter from "./router/AppRouter"; // Importa el archivo AppRouter, que manejará las rutas de la aplicación

function App() {
  return (
    <>
      {/* Renderiza el enrutador principal que contiene todas las rutas de la aplicación */}
      <AppRouter />
    </>
  )
}

export default App; // Exporta el componente App para ser usado en otros archivos
