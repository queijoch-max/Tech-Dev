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

   const [newTitle, setNewTitle] = useState("");
const [newDescription, setNewDescription] = useState("");
const [newDate, setNewDate] = useState("");
const [newTime, setNewTime] = useState("");

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

// ==============================
// CRÉER UN ÉVÉNEMENT
// ==============================

const addEvent = () => {
    const title = newTitle.trim();
    if (!title || !newDate) return;

    onAddEvent?.(title, newDescription, newDate, newTime);

    setNewTitle("");
    setNewDescription("");
    setNewDate("");
    setNewTime("");
};

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            addEvent();
        }
    };

// ==============================
// SUPPRIMER UN ÉVÉNEMENT
// ==============================


    const deleteEvent = (id) => {
        onDeleteEvent?.(id);
    };

// ==============================
// MODIFIER UN ÉVÉNEMENT
// ==============================

const [editingEventId, setEditingEventId] = useState(null);
const [editTitle, setEditTitle] = useState("");
const [editDescription, setEditDescription] = useState("");
const [editTime, setEditTime] = useState("");

const startEditingEvent = (event) => {
    setEditingEventId(event.id);
    setEditTitle(event.title);
    setEditDescription(event.description || "");
    setEditTime(event.time || "");
};

const saveEditingEvent = (event) => {
    onUpdateEvent?.(event.id, editTitle, editDescription, event.date, editTime);
    setEditingEventId(null);
};
const handleEditKeyDown = (e, event) => {
    if (e.key === "Enter") {
        e.preventDefault();
        saveEditingEvent(event);
    }
};

// ==============================
// INFOS DE LA SEMAINE
// ==============================

const getWeekRange = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMonday);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    return { monday: toISODate(monday), sunday: toISODate(sunday) };
};
const { monday, sunday } = getWeekRange();
const weekEvents = mockEvents.filter(
    (event) => event.date >= monday && event.date <= sunday
);

const formatWeekEvent = (event) => {
    const [year, month, day] = event.date.split("-").map(Number);
    const eventDate = new Date(year, month - 1, day);
    const dayName = eventDate.toLocaleDateString("fr-FR", { weekday: "long" });

    if (event.type === "deadline") {
        return `le projet ${event.title} ${dayName}`;
    }

    return event.time
        ? `${event.title} ${dayName} à ${event.time}`
        : `${event.title} ${dayName}`;
};


    return (
        <div className={styles.agenda}>

            <div className={styles.weekSummary}>
                <h3>Cette semaine</h3>
                <p>
                    {weekEvents.length > 0
                        ? `Tu as : ${weekEvents.map(formatWeekEvent).join(", ")}.`
                        : "Rien de prévu cette semaine."}
                </p>
            </div>

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
                                            onDoubleClick={() => startEditingEvent(event)}
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

                                            {editingEventId === event.id && (
                                               <div className={styles.editEventCard}>
    <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} onKeyDown={(e) => handleEditKeyDown(e, event)} placeholder="Titre" />
    <input value={editDescription} onChange={(e) => setEditDescription(e.target.value)} onKeyDown={(e) => handleEditKeyDown(e, event)} placeholder="Description" />
    <input type="time" value={editTime} onChange={(e) => setEditTime(e.target.value)} onKeyDown={(e) => handleEditKeyDown(e, event)} />
    <button type="button" onClick={() => saveEditingEvent(event)}>Enregistrer</button>
</div>
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
                    value={newTitle}
                    onChange={(event) => setNewTitle(event.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ajouter un événement..."
                />
                 {/* DESCRIPTION */}
                <input
                    type="text"
                    value={newDescription}
                    onChange={(event) => setNewDescription(event.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ajouter une description..."
                />
                {/* DATE */}
                <input
                    type="date"
                    value={newDate}
                    onChange={(event) => setNewDate(event.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ajouter une date..."
                />
                {/* TIME */}
                <input
                    type="time"
                    value={newTime}
                    onChange={(event) => setNewTime(event.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ajouter une heure..."
                />
                <button type="button" onClick={addEvent}>
                    Ajouter
                </button>
            </div>

        </div>
    );
}

export default AgendaTable;
