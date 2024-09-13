import { useState, useEffect } from 'react';
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Pie, PieChart, Cell } from 'recharts';
import axios from 'axios';

import styles from "../styles/styles-edapage.module.scss"
import ErrorComponent from '../components/ErrorComponent';
const COLORS = ['#FFA500', '#45A29E', '#66FCF1', '#1F2833'];

import connectionErrorImg from "../assets/images/noConexion.png"


const EdaPage = () => {

    const urlBack = import.meta.env.VITE_BACK_URL

    const [cryosleepData, setCryosleepData] = useState([]);
    const [vipData, setVipData] = useState([]);
    const [ageHistogramData, setAgeHistogramData] = useState([]);
    const [planetDestinationData, setPlanetDestinationData] = useState({});

    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Función para obtener los datos desde la API
    const fetchData = async () => {
        try {

            setIsLoading(true);

            const response = await axios.get(`${urlBack}/predictions/cryosleep-vip-transported`, {
                headers: {
                    'ngrok-skip-browser-warning': 'true'
                }
            });

            const cryoData = [
                { name: 'CryoSleep False - Transported False', count: response.data.CryoSleep.CryoSleep_False_Transported_False },
                { name: 'CryoSleep False - Transported True', count: response.data.CryoSleep.CryoSleep_False_Transported_True },
                { name: 'CryoSleep True - Transported False', count: response.data.CryoSleep.CryoSleep_True_Transported_False },
                { name: 'CryoSleep True - Transported True', count: response.data.CryoSleep.CryoSleep_True_Transported_True },
            ];
            setCryosleepData(cryoData);

            const vipData = [
                { name: 'VIP False - Transported False', count: response.data.VIP.VIP_False_Transported_False },
                { name: 'VIP False - Transported True', count: response.data.VIP.VIP_False_Transported_True },
                { name: 'VIP True - Transported False', count: response.data.VIP.VIP_True_Transported_False },
                { name: 'VIP True - Transported True', count: response.data.VIP.VIP_True_Transported_True },
            ];
            setVipData(vipData);

            const responseAgeData = await axios.get(`${urlBack}/predictions/age-transportation`, {
                headers: {
                    'ngrok-skip-browser-warning': 'true'
                }
            });

            // Preparar los datos en el formato adecuado para Recharts
            const ageData = [];
            for (let bin in responseAgeData.data.age_bins_transported) {
                ageData.push({
                    name: bin,  // Rango de edad (0-10, 11-20, etc.)
                    Transported: responseAgeData.data.age_bins_transported[bin],
                    'Not Transported': responseAgeData.data.age_bins_not_transported[bin]
                });
            }

            setAgeHistogramData(ageData);

            const planetDestResponse = await axios.get(`${urlBack}/predictions/planet-destination`, {
                headers: {
                    'ngrok-skip-browser-warning': 'true'
                }
            });
            setPlanetDestinationData(planetDestResponse.data);


        } catch (error) {
            console.error("Error fetching data", error);
            setError(true);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Llamar a fetchData inicialmente
        fetchData();

        // Crear un intervalo para actualizar los datos cada 5 segundos (5000 ms)
        const interval = setInterval(() => {
            fetchData();
        }, 60000);

        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(interval);
    }, []);

    // Si hay un error de conexión, mostrar el componente de error
    if (error) {
        return (
            <ErrorComponent
                title="¡Lo Sentimos!"
                message="Estamos teniendo problemas de conexión. Favor de intentar en otro momento"
                imageUrl={connectionErrorImg}
            />
        );
    }

    return (
        <motion.section className={`${styles.contenedorPrincipalDashboard}`} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 0.5
        }}>
            {isLoading ? (
                // Mostrar el loader mientras los datos se están cargando
                <div className={styles.loaderContainer}>
                    <div className={styles.loader}></div> {/* Aquí puedes personalizar el loader */}
                    <p className={styles.loaderText}>Cargando datos...</p>
                </div>
            ) : (
                // Mostrar los gráficos cuando los datos se carguen
                <>
                    <div className='row'>
                        <div className={`col-12 col-lg-6 mt-1 ${styles.chartContainer}`}>
                            <div className={`row d-flex justify-content-between ${styles.contenedorGraficasPastel1}`}>
                                <div className={`col-12 col-lg-5 ${styles.contenedorGraficoDashboardPastel}`}>
                                    <h5 className='text-center text-black'>CryoSleep</h5>
                                    <ResponsiveContainer width="100%" height={200}>
                                        <PieChart>
                                            <Pie
                                                data={cryosleepData}
                                                dataKey="count"
                                                nameKey="name"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={80}
                                                label={({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
                                                    const RADIAN = Math.PI / 180;
                                                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                                    const y = cy + radius * Math.sin(-midAngle * RADIAN);

                                                    if (cryosleepData[index].count === 0) {
                                                        return null;
                                                    }

                                                    return (
                                                        <text
                                                            x={x}
                                                            y={y}
                                                            fill="white"
                                                            textAnchor={x > cx ? "start" : "end"}
                                                            dominantBaseline="central"
                                                        >
                                                            {`${cryosleepData[index].count}`}
                                                        </text>
                                                    );
                                                }}
                                                labelLine={false}
                                            >
                                                {cryosleepData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className={`col-12 col-lg-5 ${styles.contenedorGraficoDashboardPastel}`}>
                                    <h5 className='text-center text-black'>VIP</h5>
                                    <ResponsiveContainer width="100%" height={200}>
                                        <PieChart>
                                            <Pie
                                                data={vipData}
                                                dataKey="count"
                                                nameKey="name"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={80}
                                                label={({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
                                                    const RADIAN = Math.PI / 180;
                                                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                                    const y = cy + radius * Math.sin(-midAngle * RADIAN);

                                                    if (vipData[index].count === 0) {
                                                        return null;
                                                    }

                                                    return (
                                                        <text
                                                            x={x}
                                                            y={y}
                                                            fill="white"
                                                            textAnchor={x > cx ? "start" : "end"}
                                                            dominantBaseline="central"
                                                        >
                                                            {`${vipData[index].count}`}
                                                        </text>
                                                    );
                                                }}
                                                labelLine={false}
                                            >
                                                {vipData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                        <div className={`col-12 col-lg-6 mx-lg-3 mt-1 ${styles.contenedorGraficoDashboardHistograma}`}>
                            <h5 className='text-center text-black'>Edad</h5>
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={ageHistogramData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="Transported" fill={COLORS[3]} />
                                    <Bar dataKey="Not Transported" fill={COLORS[0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className={`col ${styles.contenedorGraficoDashboardPastel}`}>
                            <h5 className='text-center text-black'>Destinos por Planeta (Transportados)</h5>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart
                                    data={Object.keys(planetDestinationData.planet_dest_transported).map(planet => {
                                        const transported = planetDestinationData.planet_dest_transported[planet];

                                        // Agrupar por planeta y mostrar solo los transportados para los tres destinos
                                        return {
                                            planet,
                                            'Transported 55 Cancri e': transported['55 Cancri e'] || 0,
                                            'Transported PSO J318.5-22': transported['PSO J318.5-22'] || 0,
                                            'Transported TRAPPIST-1e': transported['TRAPPIST-1e'] || 0
                                        };
                                    })}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="planet" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />

                                    {/* Barras solo para los destinos transportados */}
                                    <Bar dataKey="Transported 55 Cancri e" stackId="a" fill={COLORS[0]} />
                                    <Bar dataKey="Transported PSO J318.5-22" stackId="a" fill={COLORS[1]} />
                                    <Bar dataKey="Transported TRAPPIST-1e" stackId="a" fill={COLORS[2]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </>
            )}
        </motion.section>
    );
};

export default EdaPage;
