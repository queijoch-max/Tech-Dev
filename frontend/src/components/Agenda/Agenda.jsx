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

    const mockEvents = [
        { id: 2, title: "Zoom réunion", type: "rdv", date: "2026-08-21", time: "15:00" }
    ];

// ==============================
// CONNEXION DES DEADLINES
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

  const allEvents = [...projectDeadlines, ...mockEvents];

return (
        <AgendaTable
            currentDate={currentDate}
            mockEvents={allEvents}
            onPreviousMonth={goToPreviousMonth}
            onNextMonth={goToNextMonth}
        />
    );

        
        }
export default Agenda;