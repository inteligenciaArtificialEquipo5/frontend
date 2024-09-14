import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import styles from "../styles/styles-homepage.module.scss";

import earthImage from "../assets/images/earthImage.webp";
import europaImage from "../assets/images/europaImage.webp";
import marsImage from "../assets/images/marsImage.webp";
import trappistImage from "../assets/images/estado1Image.png"
import psoImage from "../assets/images/estado2Image.png"
import cancriImage from "../assets/images/estado3Image.png"
import rocketLoader from "../assets/images/rocketLoader.png"

// Opciones para HomePlanet
const homePlanetOptions = [
    { label: 'Earth', imgSrc: earthImage },
    { label: 'Europa', imgSrc: europaImage },
    { label: 'Mars', imgSrc: marsImage }
];

// Opciones para Destination
const destinationOptions = [
    { label: 'TRAPPIST-1e', imgSrc: trappistImage },
    { label: 'PSO J318.5-22', imgSrc: psoImage },
    { label: '55 Cancri e', imgSrc: cancriImage }
];

// Función que genera datos aleatorios para los campos del formulario
const randomData = {
    Age: () => Math.floor(Math.random() * 100),
    RoomService: () => Math.floor(Math.random() * 1000),
    FoodCourt: () => Math.floor(Math.random() * 1000),
    ShoppingMall: () => Math.floor(Math.random() * 1000),
    Spa: () => Math.floor(Math.random() * 1000),
    VRDeck: () => Math.floor(Math.random() * 1000),
    HomePlanet: () => homePlanetOptions[Math.floor(Math.random() * homePlanetOptions.length)].label,
    Destination: () => ['TRAPPIST-1e', 'PSO J318.5-22', '55 Cancri e'][Math.floor(Math.random() * 3)],
    CryoSleep: () => ['Yes', 'No'][Math.floor(Math.random() * 2)],
    VIP: () => ['Yes', 'No'][Math.floor(Math.random() * 2)],
    CabinDeck: () => ['B', 'F', 'A', 'G', 'E', 'D', 'C', 'T'][Math.floor(Math.random() * 8)],
    CabinSide: () => ['P', 'S'][Math.floor(Math.random() * 2)]
};

const HomePage = () => {

    const urlBack = import.meta.env.VITE_BACK_URL

    const [formData, setFormData] = useState({
        Age: '',
        HomePlanet: '',
        Destination: '',
        CryoSleep: '',
        VIP: '',
        CabinDeck: '',
        CabinSide: '',
        RoomService: '',
        FoodCourt: '',
        ShoppingMall: '',
        Spa: '',
        VRDeck: ''
    });

    const [activeHomePlanetIndex, setActiveHomePlanetIndex] = useState(0);
    const [activeDestinationIndex, setActiveDestinationIndex] = useState(0);

    const [isLoading, setIsLoading] = useState(false);

    const [predictionResult, setPredictionResult] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Función para seleccionar un HomePlanet y actualizar el estado
    const handleHomePlanetSelect = (planet, index) => {
        // Actualiza el formulario con el planeta seleccionado
        setFormData(prevData => ({
            ...prevData,
            HomePlanet: planet
        }));
        setActiveHomePlanetIndex(index); // Actualiza el índice activo del carrusel
    };

    // Función para seleccionar un Destination y actualizar el estado
    const handleDestinationSelect = (destination, index) => {
        setFormData(prevData => ({
            ...prevData,
            Destination: destination
        }));
        setActiveDestinationIndex(index);
    };

    // Función para seleccionar CabinDeck
    const handleCabinDeckSelect = (deck) => {
        setFormData(prevData => ({
            ...prevData,
            CabinDeck: deck
        }));
    };

    // Función para seleccionar CabinSide
    const handleCabinSideSelect = (side) => {
        setFormData(prevData => ({
            ...prevData,
            CabinSide: side
        }));
    };

    // Función para manejar los cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto del formulario
        setIsLoading(true); // Activa el estado de cargando

        setTimeout(async () => {
            // Datos que se enviarán al backend
            const datos = {
                "Age": formData.Age,
                "RoomService": formData.RoomService,
                "FoodCourt": formData.FoodCourt,
                "ShoppingMall": formData.ShoppingMall,
                "Spa": formData.Spa,
                "VRDeck": formData.VRDeck,
                "HomePlanet": homePlanetOptions.findIndex(option => option.label === formData.HomePlanet),
                "Destination": destinationOptions.findIndex(option => option.label === formData.Destination),
                "CryoSleep": formData.CryoSleep === 'Yes' ? true : false,
                "VIP": formData.VIP === 'Yes' ? true : false,
                "CabinDeck": formData.CabinDeck,
                "CabinSide": formData.CabinSide
            };

            try {
                // Envío de datos al backend
                const response = await axios.post(`${urlBack}/predict`, datos, {
                    headers: {
                        'ngrok-skip-browser-warning': 'true'
                    }
                });
                setPredictionResult(response.data); // Guarda el resultado de la predicción
            } catch (error) {
                console.error('Error al enviar los datos:', error);
            } finally {
                setIsLoading(false); // Quita pantalla de carga
                setShowModal(true); // Muestra el modal con el resultado
            }
        }, 2000);
    };

    // Función para generar datos aleatorios para el formulario 
    const generateRandomData = () => {
        const newData = {};

        // Generar los datos visibles
        ['Age', 'HomePlanet', 'Destination', 'CryoSleep', 'VIP', 'CabinDeck', 'CabinSide'].forEach(column => {
            newData[column] = randomData[column]();
        });

        // Actualizar el índice del carrusel de HomePlanet y Destination
        const homePlanetIndex = homePlanetOptions.findIndex(option => option.label === newData.HomePlanet);
        const destinationIndex = destinationOptions.findIndex(option => option.label === newData.Destination);

        setActiveHomePlanetIndex(homePlanetIndex);
        setActiveDestinationIndex(destinationIndex);

        // Generar datos ocultos para RoomService, FoodCourt, etc.
        newData.RoomService = randomData.RoomService();
        newData.FoodCourt = randomData.FoodCourt();
        newData.ShoppingMall = randomData.ShoppingMall();
        newData.Spa = randomData.Spa();
        newData.VRDeck = randomData.VRDeck();

        // Aplicar lógica de CryoSleep
        if (newData.CryoSleep === 'Yes') {
            newData.RoomService = '0';
            newData.FoodCourt = '0';
            newData.ShoppingMall = '0';
            newData.Spa = '0';
            newData.VRDeck = '0';
        }

        setFormData(newData); // Actualiza el formulario con los datos aleatorios
    };

    return (
        <motion.section className={`container mt-5 ${styles.homePage}`}
            initial={{ opacity: 0, scale: 0.8 }}  // Empieza con opacidad 0 y tamaño reducido
            animate={{ opacity: 1, scale: 1 }}   // Se anima a opacidad 1 y tamaño original
            transition={{
                type: "spring",     // Tipo de animación "spring" para dar el efecto de elasticidad
                stiffness: 260,     // La rigidez del "spring" (valor más alto = rebote más rápido)
                damping: 20,        // Amortiguación del "spring"
                duration: 0.5       // Duración del efecto
            }}
        >
            <h1 className={styles.heading}>Ingreso de Datos para Predicción</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <section className="row w-100">
                    {/* Carrusel de HomePlanet */}
                    <div className="col-lg-6 mb-3">
                        <label className={`form-label ${styles.formGroupLabel}`}>HomePlanet</label>
                        <div id="homePlanetCarousel" className="carousel slide">
                            <div className="carousel-inner">
                                {homePlanetOptions.map((planet, index) => (
                                    <div
                                        key={planet.label}
                                        className={`carousel-item ${index === activeHomePlanetIndex ? 'active' : ''}`}
                                        onClick={() => handleHomePlanetSelect(planet.label, index)}
                                    >
                                        <div className={styles.imageWrapper}>
                                            <img src={planet.imgSrc} className={`w-100 img-fluid ${styles.imageHomePlanetInputHomePage}`} alt={planet.label} />
                                            <h5 className='text-white'>{planet.label}</h5>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#homePlanetCarousel" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#homePlanetCarousel" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>

                    {/* Carrusel de Destination */}
                    <div className="col-lg-6 mb-3">
                        <label className={`form-label ${styles.formGroupLabel}`}>Destination</label>
                        <div id="destinationCarousel" className="carousel slide">
                            <div className="carousel-inner">
                                {destinationOptions.map((destination, index) => (
                                    <div
                                        key={destination.label}
                                        className={`carousel-item ${index === activeDestinationIndex ? 'active' : ''}`}
                                        onClick={() => handleDestinationSelect(destination.label, index)}
                                    >
                                        <div className={styles.imageWrapper}>
                                            <img src={destination.imgSrc} className={`w-100 img-fluid ${styles.imageDestinationInputHomePage}`} alt={destination.label} />
                                            <h5 className='text-white'>{destination.label}</h5>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#destinationCarousel" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#destinationCarousel" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </section>
                <section className="row w-100">
                    <div className="col-12 col-md-4 mb-3">
                        <label className={`form-label ${styles.formGroupLabel}`} htmlFor="Age">Age</label>
                        <input
                            type="number"
                            id="Age"
                            name="Age"
                            className={`form-control ${styles.formGroupInputText}`}
                            value={formData.Age}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-12 col-md-4 mb-3">
                        <label className={`form-label ${styles.formGroupLabel}`} htmlFor="CryoSleep">CryoSleep</label>
                        <select
                            id="CryoSleep"
                            name="CryoSleep"
                            className={`form-select ${styles.formGroupInput}`}
                            value={formData.CryoSleep}
                            onChange={handleChange}
                        >
                            <option value="">Seleccionar Opción</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>

                    <div className="col-12 col-md-4 mb-3">
                        <label className={`form-label ${styles.formGroupLabel}`} htmlFor="VIP">VIP</label>
                        <select
                            id="VIP"
                            name="VIP"
                            className={`form-select ${styles.formGroupInput}`}
                            value={formData.VIP}
                            onChange={handleChange}
                        >
                            <option value="">Seleccionar Opción</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                        <label className={`form-label ${styles.formGroupLabel}`}>CabinSide</label>
                        <button
                            type="button"
                            className={`btn btn-custom w-100 ${styles.btnModalCabinDeckInputHomePage}`}
                            data-bs-toggle="modal"
                            data-bs-target="#cabinSideModal"
                        >
                            Seleccionar CabinSide
                        </button>
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                        <label className={`form-label ${styles.formGroupLabel}`}>CabinDeck</label>
                        <button
                            type="button"
                            className={`btn btn-custom w-100 ${styles.btnModalCabinDeckInputHomePage}`}
                            data-bs-toggle="modal"
                            data-bs-target="#cabinDeckModal"
                        >
                            Seleccionar CabinDeck
                        </button>
                    </div>
                </section>

                {/* Modal CabinSide */}
                <div className="modal fade" id="cabinDeckModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="cabinDeckModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className={`modal-title fs-5 ${styles.titleModalCabinDeck}`} id="cabinDeckModalLabel">Seleccionar Deck</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className={`modal-body ${styles.modalCabinDeck}`}>
                                {/* Opciones ubicadas en los niveles del cohete */}
                                <button
                                    type='button'
                                    className={`${styles.deckButton} ${styles.deckA} ${formData.CabinDeck === 'A' ? styles.active : ''}`}
                                    onClick={() => handleCabinDeckSelect('A')}>
                                    A
                                </button>
                                <button
                                    type='button'
                                    className={`${styles.deckButton} ${styles.deckB} ${formData.CabinDeck === 'B' ? styles.active : ''}`}
                                    onClick={() => handleCabinDeckSelect('B')}>
                                    B
                                </button>
                                <button
                                    type='button'
                                    className={`${styles.deckButton} ${styles.deckC} ${formData.CabinDeck === 'C' ? styles.active : ''}`}
                                    onClick={() => handleCabinDeckSelect('C')}>
                                    C
                                </button>
                                <button
                                    type='button'
                                    className={`${styles.deckButton} ${styles.deckD} ${formData.CabinDeck === 'D' ? styles.active : ''}`}
                                    onClick={() => handleCabinDeckSelect('D')}>
                                    D
                                </button>
                                <button
                                    type='button'
                                    className={`${styles.deckButton} ${styles.deckE} ${formData.CabinDeck === 'E' ? styles.active : ''}`}
                                    onClick={() => handleCabinDeckSelect('E')}>
                                    E
                                </button>
                                <button
                                    type='button'
                                    className={`${styles.deckButton} ${styles.deckF} ${formData.CabinDeck === 'F' ? styles.active : ''}`}
                                    onClick={() => handleCabinDeckSelect('F')}>
                                    F
                                </button>
                                <button
                                    type='button'
                                    className={`${styles.deckButton} ${styles.deckG} ${formData.CabinDeck === 'G' ? styles.active : ''}`}
                                    onClick={() => handleCabinDeckSelect('G')}>
                                    G
                                </button>
                                <button
                                    type='button'
                                    className={`${styles.deckButton} ${styles.deckT} ${formData.CabinDeck === 'T' ? styles.active : ''}`}
                                    onClick={() => handleCabinDeckSelect('T')}>
                                    T
                                </button>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal CabinSide */}
                <div className="modal fade" id="cabinSideModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="cabinSideModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className={`modal-title fs-5 ${styles.titleModalCabinSide}`} id="cabinSideModalLabel">Seleccionar Side</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className={`modal-body ${styles.modalCabinSide}`}>
                                {/* Opciones ubicadas en los lados del cohete */}
                                <button
                                    type='button'
                                    className={`${styles.sideButton} ${styles.sideP} ${formData.CabinSide === 'P' ? styles.active : ''}`}
                                    onClick={() => handleCabinSideSelect('P')}>
                                    Lado P
                                </button>
                                <button
                                    type='button'
                                    className={`${styles.sideButton} ${styles.sideS} ${formData.CabinSide === 'S' ? styles.active : ''}`}
                                    onClick={() => handleCabinSideSelect('S')}>
                                    Lado S
                                </button>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Botones de generar datos y enviar */}
                <div className={`w-100 ${styles.buttonContainer}`}>
                    <div className={styles.randomButtonWrapper}>
                        <button type="button" className={styles.randomButton} onClick={generateRandomData}>Generar Datos Aleatorios</button>
                    </div>
                    <div className={styles.submitButtonWrapper}>
                        <button type="submit" className={styles.submitButton}>Enviar</button>
                    </div>
                </div>
            </form>

            {/* Loader del cohete */}
            {isLoading && (
                <div className={styles.backdrop}>
                    <motion.div
                        initial={{ x: '-60vw' }} // Comienza fuera de la pantalla (a la derecha)
                        animate={{ x: '60vw' }}   // Se mueve hacia el centro
                        transition={{ duration: 2.5, }}
                    ><img className={styles.rocket} src={rocketLoader} alt="loader" /></motion.div>
                </div>
            )}

            {/* Modal del resultado de la predicción */}
            {showModal && (
                <>
                    <div className={`modal-backdrop fade show ${styles.backdropBlur}`}></div>
                    <motion.div
                        className="modal fade show"
                        style={{ display: 'block', zIndex: 1055 }} // Asegura que el modal esté por encima del backdrop
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className={`modal-dialog modal-dialog-centered`}>
                            <div className={`modal-content ${styles.modalResult}`}>
                                <div className="modal-body">
                                    <h5 className="modal-title text-center m-4 text-white">Resultado de la Predicción</h5>
                                    <p className='m-2 text-white'>
                                        {predictionResult
                                            ? predictionResult.prediction
                                                ? 'Lo sentimos, pero lo más probable es que la persona ingresada ha sido teletransportada.'
                                                : 'La persona ingresada no fue teletransportada.'
                                            : "No hay datos disponibles"}
                                    </p>
                                    <div className='text-end'>
                                        <button
                                            type="button"
                                            className={`btn btn-custom m-2 text-white ${styles.btnModalResult}`}
                                            onClick={() => setShowModal(false)}
                                        >
                                            Cerrar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </motion.section>
    );
};

export default HomePage;