import { motion } from 'framer-motion'; // Importa la librería Framer Motion para animaciones
import styles from '../styles/styles-modelpage.module.scss'; // Importa los estilos SCSS

import modeloImagen from '../assets/images/ModeloArbol.jpeg'; // Importa la imagen del modelo

const ModeloPage = () => {
    return (
        // Sección que contiene la animación y la imagen del modelo
        <motion.section 
            className={`container mt-2 p-5 ${styles.contenedorPrincipalDashboard}`}  // Aplica clases de estilo
            initial={{ opacity: 0, scale: 0.8 }}  // Configura el estado inicial de la animación (opacidad 0 y tamaño reducido)
            animate={{ opacity: 1, scale: 1 }}  // Configura la animación para que la opacidad sea 1 y el tamaño vuelva a ser normal
            transition={{
                type: "spring",  // Usa animación tipo "spring" para crear un efecto de rebote
                stiffness: 260,  // La rigidez del "spring", mayor valor implica un rebote más rápido
                damping: 20,  // Amortiguación del "spring", controla la suavidad del final de la animación
                duration: 0.5  // Duración total de la animación
            }}
        >
            {/* Imagen que muestra el modelo con un estilo aplicado */}
            <img src={modeloImagen} alt="Modelo Sin Fondo" className={`img-fluid ${styles.modeloImagen}`} />
        </motion.section>
    );
}

export default ModeloPage;  // Exporta el componente para ser usado en otras partes de la aplicación
