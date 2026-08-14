import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { API_URL } from "../../config";

// ==============================
// PAGE : DASHBOARD
// ==============================

function Dashboard() {
    

    // ==============================
    // TÂCHES DU JOUR
    // ==============================

    const [tasksToday, setTasksToday] = useState([]);

    // ==============================
    // RÉCUPÉRER LES TÂCHES
    // ==============================

    useEffect(() => {

        const fetchTasks = async () => {

            try {

                const response = await fetch(
                    `${API_URL}/tasks`
                );

                if (!response.ok) {
                    console.error(
                        "Erreur lors de la récupération des tâches :",
                        response.status
                    );
                    return;
                }

                const data = await response.json();

                const todayTasks = data.tasks.filter(
    (task) =>
        task.period === "today" &&
        task.status !== "done"
);

setTasksToday(todayTasks);

            } catch (error) {

                console.error(
                    "Erreur réseau lors de la récupération des tâches :",
                    error
                );
            }
        };

        fetchTasks();

    }, []);

    // ==============================
    // PROJETS EN COURS
    // ==============================

    const [ongoingProjects, setOngoingProjects] = useState([]);

    // ==============================
    // RÉCUPÉRER LES PROJETS EN COURS
    // ==============================

    useEffect(() => {

        const fetchOngoingProjects = async () => {

            try {

                const response = await fetch(
                    `${API_URL}/projects`
                );

                if (!response.ok) {
                    console.error(
                        "Erreur lors de la récupération des projets en cours :",
                        response.status
                    );
                    return;
                }

                const data = await response.json();

        const ongoingProjects = data.projects.filter(
            (project) =>
                 project.status === "in_progress"
);

                setOngoingProjects(ongoingProjects);

            } catch (error) {

                console.error(
                    "Erreur réseau lors de la récupération des projets en cours :",
                    error
                );
            }
        };

        fetchOngoingProjects();

    }, []);

    // ==============================
    // METEO
    // ==============================

    const [weather, setWeather] = useState(null);

    useEffect(() => {

    const fetchWeather = async () => {

        try {

           const response = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=45.316&longitude=4.729&current_weather=true"
);

            if (!response.ok) {
                console.error("Erreur météo :", response.status);
                return;
            }

            const data = await response.json();

            setWeather(data.current_weather);

        } catch (error) {
            console.error("Erreur réseau météo :", error);
        }
    };

    fetchWeather();

}, []);

const weatherCodes = {
    0: { emoji: "☀️", label: "Ciel dégagé" },
    1: { emoji: "🌤️", label: "Plutôt dégagé" },
    2: { emoji: "⛅", label: "Partiellement nuageux" },
    3: { emoji: "☁️", label: "Couvert" },
    45: { emoji: "🌫️", label: "Brouillard" },
    48: { emoji: "🌫️", label: "Brouillard givrant" },
    51: { emoji: "🌦️", label: "Bruine légère" },
    53: { emoji: "🌦️", label: "Bruine" },
    55: { emoji: "🌦️", label: "Bruine forte" },
    56: { emoji: "🌧️", label: "Bruine verglaçante légère" },
    57: { emoji: "🌧️", label: "Bruine verglaçante" },
    61: { emoji: "🌧️", label: "Pluie légère" },
    63: { emoji: "🌧️", label: "Pluie" },
    65: { emoji: "🌧️", label: "Pluie forte" },
    66: { emoji: "🌧️", label: "Pluie verglaçante légère" },
    67: { emoji: "🌧️", label: "Pluie verglaçante" },
    71: { emoji: "🌨️", label: "Neige légère" },
    73: { emoji: "🌨️", label: "Neige" },
    75: { emoji: "🌨️", label: "Neige forte" },
    77: { emoji: "🌨️", label: "Grains de neige" },
    80: { emoji: "🌦️", label: "Averses légères" },
    81: { emoji: "🌦️", label: "Averses" },
    82: { emoji: "⛈️", label: "Averses violentes" },
    85: { emoji: "🌨️", label: "Averses de neige légères" },
    86: { emoji: "🌨️", label: "Averses de neige" },
    95: { emoji: "⛈️", label: "Orage" },
    96: { emoji: "⛈️", label: "Orage avec grêle légère" },
    99: { emoji: "⛈️", label: "Orage avec grêle forte" }
};

const getWeatherTip = (weatherCode, temperature) => {

    const isStorm = weatherCode >= 95;
    const isRain = [51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weatherCode);

    if (isStorm) {
        return "Fais gaffe à tes équipements !";
    }

    if (isRain) {
        return "Tu as une bonne excuse pour pas sortir !";
    }

    if (temperature > 25) {
        return "Pense à refroidir tes équipements";
    }

    if (temperature < 15) {
        return "Raison pour rester près de la chaleur de ton ordi !";
    }

    return "Profites-en pour sortir un peu de ta grotte, ta tête a besoin de respirer";
};

    return (
        <main className={styles.dashboard}>

            <h1>3 août 2026</h1>

            {/* ==============================
                RÉSUMÉ
                ============================== */}

            <section className={styles.summary}>

                <div className={styles.card}>

                    <span className={styles.label}>
                        Tâches aujourd'hui
                    </span>

                    <strong>
                        {tasksToday.length}
                    </strong>

                </div>

                <div className={styles.card}>

                    <span className={styles.label}>
                        Projets en cours
                    </span>

                    <strong>
                        {ongoingProjects.length}
                    </strong>

                </div>

                <div className={styles.card}>

    <span className={styles.label}>
        Météo de Félines
    </span>

    {weather && (
        <>
            <strong>
    {weatherCodes[weather.weathercode]?.emoji}{" "}
    {weatherCodes[weather.weathercode]?.label}
    {" - "}
    {weather.temperature}°C
</strong>

            <p>
                {getWeatherTip(weather.weathercode, weather.temperature)}
            </p>
        </>
    )}

</div>

            </section>

            {/* ==============================
                CALENDRIER
                ============================== */}

            <section className={styles.calendar}>

                <h2>Calendrier</h2>

                <div className={styles.calendarPlaceholder}>
                    Calendrier à venir...
                </div>

            </section>

        </main>
    );
}

export default Dashboard;