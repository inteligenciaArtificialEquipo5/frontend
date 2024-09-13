import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Pie, PieChart, Cell } from 'recharts';
import axios from 'axios';

import styles from "../styles/styles-edapage.module.scss"
const COLORS = ['#FFA500', '#45A29E', '#66FCF1', '#1F2833'];


const EdaPage = () => {

    const urlBack = import.meta.env.VITE_BACK_URL

    const [cryosleepData, setCryosleepData] = useState([]);
    const [vipData, setVipData] = useState([]);

    // Función para obtener los datos desde la API
    const fetchData = async () => {
        try {
            const response = await axios.get(`${urlBack}/predictions/cryosleep-vip-transported`);

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
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    useEffect(() => {
        // Llamar a fetchData inicialmente
        fetchData();

        // Crear un intervalo para actualizar los datos cada 5 segundos (5000 ms)
        const interval = setInterval(() => {
            fetchData();
        }, 5000);

        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(interval);
    }, []);

    return (
        <section className={`${styles.contenedorPrincipalDashboard}`}>
            <div className='row'>
                <div className={`col-12 col-lg-6 ${styles.chartContainer}`}>
                    <div className={`row d-flex justify-content-between ${styles.contenedorGraficasPastel1}`}>
                        <div className={`col-12 col-lg-6 ${styles.contenedorGraficoDashboardPastel}`}>
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
                                        label={({
                                            cx,
                                            cy,
                                            midAngle,
                                            innerRadius,
                                            outerRadius,
                                            index
                                        }) => {
                                            const RADIAN = Math.PI / 180;
                                            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                            const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                            const y = cy + radius * Math.sin(-midAngle * RADIAN);

                                            // Condición para no mostrar el valor si es 0
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
                                        labelLine={false}  // Oculta las líneas de los labels fuera del gráfico
                                    >
                                        {cryosleepData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className={`col-12 col-lg-6 ${styles.contenedorGraficoDashboardPastel}`}>
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
                                        label={({
                                            cx,
                                            cy,
                                            midAngle,
                                            innerRadius,
                                            outerRadius,
                                            index
                                        }) => {
                                            const RADIAN = Math.PI / 180;
                                            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                            const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                            const y = cy + radius * Math.sin(-midAngle * RADIAN);

                                            // Condición para no mostrar el valor si es 0
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
                                        labelLine={false}  // Oculta las líneas de los labels fuera del gráfico
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
            </div>
        </section>
    );
};

export default EdaPage;
