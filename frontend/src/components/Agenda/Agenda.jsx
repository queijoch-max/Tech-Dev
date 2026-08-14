import styles from "./Agenda.module.css";
import { useState } from "react";

//
// COMPONENT : AGENDA
//

function Agenda() {

const [currentDate, setCurrentDate] = useState(new Date());

//
// GENERATION DU CALENDRIER
//

const goToPreviousMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
};

const goToNextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
};

const generateCalendarDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    let startWeekDay = firstDayOfMonth.getDay();
    startWeekDay = startWeekDay === 0 ? 6 : startWeekDay - 1;

    const days = [];
    for (let i = 0; i < startWeekDay; i++) {
        days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
        days.push(new Date(year, month, day));
    }

    return days;
};

const days = generateCalendarDays(currentDate);

const mockEvents = [
    {id: 1, title: "Finir le dashboard", type: "deadline", date: "2026-08-19"},
    {id: 2, title: "Zoom réunion", type: "rdv", date: "2026-08-21", time: "15:00"}
];

const toISODate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

//
// AFFICHAGE
//

return (
    <div className={styles.agenda}>

        {/* ==============================
            EN-TÊTE : NAVIGATION MOIS
            ============================== */}

        <div className={styles.calendarHeader}>

            <button type="button" onClick={goToPreviousMonth}>
                ◀
            </button>

            <h2>
                {currentDate.toLocaleDateString("fr-FR", {
                    month: "long",
                    year: "numeric"
                })}
            </h2>

            <button type="button" onClick={goToNextMonth}>
                ▶
            </button>

        </div>

        {/* ==============================
            JOURS DE LA SEMAINE
            ============================== */}

        <div className={styles.weekDays}>
            <span>Lun</span>
            <span>Mar</span>
            <span>Mer</span>
            <span>Jeu</span>
            <span>Ven</span>
            <span>Sam</span>
            <span>Dim</span>
        </div>

        {/* ==============================
            GRILLE DU CALENDRIER
            ============================== */}
<div className={styles.calendarGrid}>

    {days.map((day, index) => {

        const dayEvents = day
            ? mockEvents.filter((event) => event.date === toISODate(day))
            : [];

        return (
            <div key={index} className={styles.calendarDay}>

                {day && (
                    <>
                        <span className={styles.dayNumber}>
                            {day.getDate()}
                        </span>

                        {dayEvents.map((event) => (
                            <div
                                key={event.id}
                                className={
                                    event.type === "rdv"
                                        ? styles.eventRdv
                                        : styles.eventDeadline
                                }
                            >
                                {event.title}
                            </div>
                        ))}
                    </>
                )}

            </div>
        );
    })}

</div>

    </div>

);
}
export default Agenda;