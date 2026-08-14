import { useState } from "react";
import styles from "./Agenda.module.css";

// ==============================
// COMPOSANT : AFFICHAGE DU CALENDRIER
// ==============================

function AgendaTable({
    currentDate,
    mockEvents,
    onPreviousMonth,
    onNextMonth,
    onAddEvent,
    onUpdateEvent,
    onDeleteEvent
}) {

    const [newEvent, setNewEvent] = useState("");

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

    const toISODate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const days = generateCalendarDays(currentDate);

    const addEvent = () => {
        const title = newEvent.trim();

        if (!title) return;

        onAddEvent?.(title, "", toISODate(currentDate), "");
        setNewEvent("");
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            addEvent();
        }
    };

    const deleteEvent = (id) => {
        onDeleteEvent?.(id);
    };

    return (
        <div className={styles.agenda}>

            {/* ==============================
                EN-TÊTE : NAVIGATION MOIS
                ============================== */}

            <div className={styles.calendarHeader}>

                <button type="button" onClick={onPreviousMonth}>
                    ◀
                </button>

                <h2>
                    {currentDate.toLocaleDateString("fr-FR", {
                        month: "long",
                        year: "numeric"
                    })}
                </h2>

                <button type="button" onClick={onNextMonth}>
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
                                            <span className={styles.eventTitle}>
                                                {event.title}
                                            </span>

                                            {event.type === "rdv" && (
                                                <button
                                                    type="button"
                                                    className={styles.deleteEventButton}
                                                    onClick={() => deleteEvent(event.id)}
                                                >
                                                    ×
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </>
                            )}

                        </div>
                    );
                })}

            </div>

            {/* ==============================
                AJOUT D'UN ÉVÉNEMENT
                ============================== */}

            <div className={styles.addEvent}>
                <input
                    type="text"
                    value={newEvent}
                    onChange={(event) => setNewEvent(event.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ajouter un événement..."
                />
                <button type="button" onClick={addEvent}>
                    Ajouter
                </button>
            </div>

        </div>
    );
}

export default AgendaTable;
