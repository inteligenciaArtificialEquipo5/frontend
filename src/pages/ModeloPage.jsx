import { motion } from 'framer-motion';
import styles from '../styles/styles-modelpage.module.scss';

import modeloImagen from '../assets/images/ModeloArbol.jpeg'

const ModeloPage = () => {
    return (
        <motion.section 
            className={`container mt-2 p-5 ${styles.contenedorPrincipalDashboard}`} 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                duration: 0.5
            }}>
            
            
            <img src={modeloImagen} alt="Modelo Sin Fondo" className={`img-fluid ${styles.modeloImagen}`} />
        </motion.section>
    );
}

export default ModeloPage;
