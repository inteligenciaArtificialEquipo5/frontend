import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom"

import HomePage from "../pages/HomePage"
import HeaderComponent from "../components/HeaderComponent"
import ModeloPage from "../pages/ModeloPage"
import EdaPage from "../pages/EdaPage"

const AppRouter = () => {
    return (
        <Router>
            <HeaderComponent />
            <main className="container">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/modelo" element={<ModeloPage />} />
                    <Route path="/eda" element={<EdaPage />} />


                    {/* Ruta por default */}
                    <Route path="/*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
        </Router>
    )
}

export default AppRouter
