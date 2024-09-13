import PropTypes from 'prop-types';
import { motion } from 'framer-motion'

import styles from '../styles/styles-errorcomponent.module.scss';  // Importa los estilos

const ErrorComponent = ({ title, message, imageUrl }) => {
    return (
        <motion.section className={`container mt-2 p-5 ${styles.errorContainer}`} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 0.5
        }}>
            <h1 className={styles.errorTitle}>{title || "Error"}</h1>
            <p className={styles.errorMessage}>{message || "Ha ocurrido un problema con la conexión. Por favor, inténtalo de nuevo más tarde."}</p>
            {imageUrl && <img src={imageUrl} alt="Error" className={`img-fluid ${styles.errorImage}`} />}
        </motion.section>
    );
}

ErrorComponent.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    imageUrl: PropTypes.string  // Nueva prop para la URL de la imagen
};

export default ErrorComponent;
