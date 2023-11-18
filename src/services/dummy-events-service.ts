import { Event, EventsService, MonthYear } from "@/types/types";
import { DUMMY_EVENTS } from "../data/dummy-data";

const eventsService: EventsService = {
  getAllEvents: async function () {
    return DUMMY_EVENTS;
  },

  getFeaturedEvents: async function () {
    return DUMMY_EVENTS.filter((event) => event.isFeatured);
  },

  getEventById: async function (id: any) {
    return DUMMY_EVENTS.find((event) => event.id === id);
  },

  getFilteredEvents: async function (dateFilter: MonthYear) {
    const { year, month } = dateFilter;

    let filteredEvents = DUMMY_EVENTS.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
      );
    });

    return filteredEvents;
  },
};

export default eventsService;
