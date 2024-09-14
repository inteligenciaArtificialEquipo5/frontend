import {
    BrowserRouter as Router,  // Importa el Router de react-router-dom para manejar la navegación
    Routes,  // Importa Routes que envuelve todas las rutas de la aplicación
    Route,  // Importa Route para definir cada una de las rutas
    Navigate  // Importa Navigate para redireccionar a una ruta específica
} from "react-router-dom"

import HomePage from "../pages/HomePage";  // Importa la página HomePage
import HeaderComponent from "../components/HeaderComponent";  // Importa el componente de cabecera
import ModeloPage from "../pages/ModeloPage";  // Importa la página ModeloPage
import EdaPage from "../pages/EdaPage";  // Importa la página EdaPage

const AppRouter = () => {
    return (
        <Router>
            {/* El componente Header se muestra en todas las rutas */}
            <HeaderComponent />
            
            <main className="container">
                <Routes>
                    {/* Ruta para la página de inicio */}
                    <Route path="/" element={<HomePage />} />

                    {/* Ruta para la página del modelo */}
                    <Route path="/modelo" element={<ModeloPage />} />

                    {/* Ruta para la página de análisis de datos (EDA) */}
                    <Route path="/eda" element={<EdaPage />} />

                    {/* Ruta por defecto, redirecciona a HomePage si la ruta no existe */}
                    <Route path="/*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
        </Router>
    )
}

export default AppRouter;  // Exporta el componente AppRouter para que sea usado en el componente principal App
