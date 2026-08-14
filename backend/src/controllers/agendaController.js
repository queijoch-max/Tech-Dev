import {
    getAllEvents,
    createEvent as createEventService,
    updateEvent as updateEventService,
    deleteEvent as deleteEventService
} from "../services/agendaService.js";

const getEvents = async (req, res) => {
    const events = await getAllEvents();

    res.json({
        message: "Liste des événements",
        events: events
    });
};

const createEvent = async (req, res) => {
    const { title, description, date, time } = req.body;

    const eventId = await createEventService(
        title,
        description,
        date,
        time
    );

    res.status(201).json({
        message: "Événement ajouté avec succès",
        eventId: eventId
    });
};

const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { title, description, date, time } = req.body;

    const result = await updateEventService(
        title,
        description,
        date,
        time,
        id
    );

    res.json({
        message: "Événement modifié avec succès",
        changes: result
    });
};

const deleteEvent = async (req, res) => {
    const { id } = req.params;
    const result = await deleteEventService(id);

    res.json({
        message: "Événement supprimé avec succès",
        changes: result
    });
};

export {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
};
