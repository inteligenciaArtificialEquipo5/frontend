import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import 'boxicons/css/boxicons.min.css'

// Importación de estilos
import "./styles/styles-general.module.scss"

import AppRouter from "./router/AppRouter";

function App() {

  return (
    <>
      <AppRouter />
    </>
  )
}

export default App
