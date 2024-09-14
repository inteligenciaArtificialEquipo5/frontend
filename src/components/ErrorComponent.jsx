import PropTypes from 'prop-types'; // Importa PropTypes para validar las props
import { motion } from 'framer-motion'; // Importa Framer Motion para animaciones

import styles from '../styles/styles-errorcomponent.module.scss';  // Importa los estilos SCSS

const ErrorComponent = ({ title, message, imageUrl }) => {
    return (
        // Sección animada que aparece con un efecto de escala y opacidad
        <motion.section className={`container mt-2 p-5 ${styles.errorContainer}`} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 0.5
        }}>
            {/* Título del error, con valor predeterminado "Error" */}
            <h1 className={styles.errorTitle}>{title || "Error"}</h1>
            {/* Mensaje del error, con valor predeterminado en caso de no recibir prop */}
            <p className={styles.errorMessage}>{message || "Ha ocurrido un problema con la conexión. Por favor, inténtalo de nuevo más tarde."}</p>
            {/* Si se proporciona imageUrl, muestra la imagen */}
            {imageUrl && <img src={imageUrl} alt="Error" className={`img-fluid ${styles.errorImage}`} />}
        </motion.section>
    );
}

ErrorComponent.propTypes = {
    title: PropTypes.string, // title debe ser una cadena
    message: PropTypes.string, // message debe ser una cadena
    imageUrl: PropTypes.string  // imageUrl debe ser una cadena que representa la URL de la imagen
};

export default ErrorComponent;
