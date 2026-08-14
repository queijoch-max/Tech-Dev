import { useState, useEffect } from "react";
import { API_URL } from "../../config";
import AgendaTable from "./AgendaTable";

function Agenda() {

    const [currentDate, setCurrentDate] = useState(new Date());

    const goToPreviousMonth = () => {
        setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };

    // ==============================
    // RÉCUPÉRER LES ÉVÉNEMENTS
    // ==============================

    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`${API_URL}/agenda`);

                if (!response.ok) {
                    console.error("Erreur lors de la récupération des événements :", response.status);
                    return;
                }

                const data = await response.json();
const eventsWithType = data.events.map((event) => ({ ...event, type: "rdv" }));
setEvents(eventsWithType);

            } catch (error) {
                console.error("Erreur réseau lors de la récupération des événements :", error);
            }
        };

        fetchEvents();

    }, []);

    // ==============================
    // RÉCUPÉRER LES DEADLINES DE PROJETS
    // ==============================

    const [projectDeadlines, setProjectDeadlines] = useState([]);

    useEffect(() => {
        const fetchProjectDeadlines = async () => {
            try {
                const response = await fetch(`${API_URL}/projects`);

                if (!response.ok) {
                    console.error("Erreur lors de la récupération des deadlines :", response.status);
                    return;
                }

                const data = await response.json();

                const deadlines = data.projects
                    .filter((project) => project.deadline)
                    .map((project) => ({
                        id: `project-${project.id}`,
                        title: project.name,
                        type: "deadline",
                        date: project.deadline
                    }));

                setProjectDeadlines(deadlines);

            } catch (error) {
                console.error("Erreur réseau lors de la récupération des deadlines :", error);
            }
        };

        fetchProjectDeadlines();

    }, []);

    const allEvents = [...projectDeadlines, ...events];

    // ==============================
    // CRÉER UN ÉVÉNEMENT
    // ==============================

    const createEvent = async (title, description, date, time) => {
        const response = await fetch(`${API_URL}/agenda`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                description: description,
                date: date,
                time: time
            })
        });

        const data = await response.json();

        const newEvent = {
            id: data.eventId,
            title: title,
            description: description,
            type: "rdv",
            date: date,
            time: time
        };

        setEvents((currentEvents) => [...currentEvents, newEvent]);
    };

    // ==============================
    // MODIFIER UN ÉVÉNEMENT
    // ==============================

    const updateEvent = async (id, title, description, date, time) => {
        const currentEvent = events.find((event) => event.id === id);
        const updatedEvent = { ...currentEvent, title, description, date, time };

        await fetch(`${API_URL}/agenda/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: updatedEvent.title,
                description: updatedEvent.description,
                date: updatedEvent.date,
                time: updatedEvent.time
            })
        });

        setEvents((currentEvents) =>
            currentEvents.map((event) =>
                event.id === id ? updatedEvent : event
            )
        );
    };

    // ==============================
    // SUPPRIMER UN ÉVÉNEMENT
    // ==============================

    const deleteEvent = async (id) => {
        await fetch(`${API_URL}/agenda/${id}`, {
            method: "DELETE"
        });

        setEvents((currentEvents) =>
            currentEvents.filter((event) => event.id !== id)
        );
    };

    // ==============================
    // AFFICHAGE
    // ==============================

    return (
        <AgendaTable
            currentDate={currentDate}
            mockEvents={allEvents}
            onPreviousMonth={goToPreviousMonth}
            onNextMonth={goToNextMonth}
            onAddEvent={createEvent}
            onUpdateEvent={updateEvent}
            onDeleteEvent={deleteEvent}
        />
    );
}

export default Agenda;
