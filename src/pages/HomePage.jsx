import { useState } from 'react';
import styles from "../styles/styles-homepage.module.scss";

const columns = [
    'Age', 'RoomService', 'FoodCourt', 'ShoppingMall', 'Spa', 'VRDeck',
    'HomePlanet', 'Destination', 'CryoSleep', 'VIP', 'CabinDeck', 'CabinSide'
];

const randomData = {
    Age: () => Math.floor(Math.random() * 100),
    RoomService: () => Math.floor(Math.random() * 1000),
    FoodCourt: () => Math.floor(Math.random() * 1000),
    ShoppingMall: () => Math.floor(Math.random() * 1000),
    Spa: () => Math.floor(Math.random() * 1000),
    VRDeck: () => Math.floor(Math.random() * 1000),
    HomePlanet: () => ['Earth', 'Europa', 'Mars'][Math.floor(Math.random() * 3)],
    Destination: () => ['TRAPPIST-1e', 'PSO J318.5-22', '55 Cancri e'][Math.floor(Math.random() * 3)],
    CryoSleep: () => ['Yes', 'No'][Math.floor(Math.random() * 2)],
    VIP: () => ['Yes', 'No'][Math.floor(Math.random() * 2)],
    CabinDeck: () => ['B', 'F', 'A', 'G', 'E', 'D', 'C', 'T'][Math.floor(Math.random() * 8)],
    CabinSide: () => ['P', 'S'][Math.floor(Math.random() * 2)]
};

const HomePage = () => {
    const [formData, setFormData] = useState({
        Age: '',
        RoomService: '',
        FoodCourt: '',
        ShoppingMall: '',
        Spa: '',
        VRDeck: '',
        HomePlanet: '',
        Destination: '',
        CryoSleep: '',
        VIP: '',
        CabinDeck: '',
        CabinSide: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => {
            const newData = { ...prevData, [name]: value };

            if (name === 'CryoSleep') {
                if (value === 'Yes') {
                    return {
                        ...newData,
                        RoomService: '0',
                        FoodCourt: '0',
                        ShoppingMall: '0',
                        Spa: '0',
                        VRDeck: '0'
                    };
                } else {
                    return {
                        ...newData,
                        RoomService: prevData.RoomService === '0' ? '' : prevData.RoomService,
                        FoodCourt: prevData.FoodCourt === '0' ? '' : prevData.FoodCourt,
                        ShoppingMall: prevData.ShoppingMall === '0' ? '' : prevData.ShoppingMall,
                        Spa: prevData.Spa === '0' ? '' : prevData.Spa,
                        VRDeck: prevData.VRDeck === '0' ? '' : prevData.VRDeck
                    };
                }
            }

            return newData;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
    };

    const generateRandomData = () => {
        const newData = {};
        columns.forEach(column => {
            newData[column] = randomData[column]();
        });

        // Aplicar lógica de CryoSleep después de generar los datos aleatorios
        if (newData.CryoSleep === 'Yes') {
            newData.RoomService = '0';
            newData.FoodCourt = '0';
            newData.ShoppingMall = '0';
            newData.Spa = '0';
            newData.VRDeck = '0';
        }

        setFormData(newData);
    };

    return (
        <section className={`container mt-5 ${styles.homePage}`}>
            <h1 className={styles.heading}>Ingreso de Datos para Predicción</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className="row">
                    {columns.map((column) => (
                        <div key={column} className="col-12 col-md-4 mb-3">
                            <label className={`form-label ${styles.formGroupLabel}`} htmlFor={column}>{column}</label>
                            {column === 'CryoSleep' || column === 'VIP' ? (
                                <select
                                    id={column}
                                    name={column}
                                    className={`form-select ${styles.formGroupInput}`}
                                    value={formData[column]}
                                    onChange={handleChange}
                                >
                                    <option value="">Seleccionar Opción</option>
                                    <option value="Yes">Sí</option>
                                    <option value="No">No</option>
                                </select>
                            ) : column === 'HomePlanet' || column === 'Destination' || column === 'CabinDeck' || column === 'CabinSide' ? (
                                <select
                                    id={column}
                                    name={column}
                                    className={`form-select ${styles.formGroupInput}`}
                                    value={formData[column]}
                                    onChange={handleChange}
                                >
                                    {column === 'HomePlanet' && (
                                        <>
                                            <option value="">Seleccionar Opción</option>
                                            <option value="Earth">Earth</option>
                                            <option value="Europa">Europa</option>
                                            <option value="Mars">Mars</option>
                                        </>
                                    )}
                                    {column === 'Destination' && (
                                        <>
                                            <option value="">Seleccionar Opción</option>
                                            <option value="TRAPPIST-1e">TRAPPIST-1e</option>
                                            <option value="PSO J318.5-22">PSO J318.5-22</option>
                                            <option value="55 Cancri e">55 Cancri e</option>
                                        </>
                                    )}
                                    {column === 'CabinDeck' && (
                                        <>
                                            <option value="">Seleccionar Opción</option>
                                            <option value="B">B</option>
                                            <option value="F">F</option>
                                            <option value="A">A</option>
                                            <option value="G">G</option>
                                            <option value="E">E</option>
                                            <option value="D">D</option>
                                            <option value="C">C</option>
                                            <option value="T">T</option>
                                        </>
                                    )}
                                    {column === 'CabinSide' && (
                                        <>
                                            <option value="">Seleccionar Opción</option>
                                            <option value="P">P</option>
                                            <option value="S">S</option>
                                        </>
                                    )}
                                </select>
                            ) : (
                                <input
                                    type="text"
                                    id={column}
                                    name={column}
                                    className={`form-control ${styles.formGroupInputText}`}
                                    value={formData[column]}
                                    onChange={handleChange}
                                    disabled={formData.CryoSleep === 'Yes' && (column === 'RoomService' || column === 'FoodCourt' || column === 'ShoppingMall' || column === 'Spa' || column === 'VRDeck')}
                                />
                            )}
                        </div>
                    ))}
                </div>
                <div className={` w-100 ${styles.buttonContainer}`}>
                    <div className={styles.randomButtonWrapper}>
                        <button type="button" className={styles.randomButton} onClick={generateRandomData}>Generar Datos Aleatorios</button>
                    </div>
                    <div className={styles.submitButtonWrapper}>
                        <button type="submit" className={styles.submitButton}>Enviar</button>
                    </div>
                </div>
            </form>
        </section>
    );
};

export default HomePage;